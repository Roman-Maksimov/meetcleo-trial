import "regenerator-runtime/runtime";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { default as ImplementedServices } from "../services";
import { IStoreFactoryParams } from "./interfaces";

interface IWindow {
  __REDUX_DEVTOOLS_EXTENSION__?: () => any;
}

export const storeFactory = ({
  services = {},
  reducers = {},
  sagas = [],
  state = {},
}: IStoreFactoryParams) => {
  const reducer = combineReducers(
    Object.keys(services).reduce((prev, key) => {
      const serviceReducer = services[key].reducer;
      return serviceReducer
        ? {
            ...prev,
            [key]: serviceReducer,
          }
        : prev;
    }, reducers)
  );

  const preloadedState = Object.keys(services).reduce((prev, key) => {
    const serviceFlows = services[key].flows;
    return serviceFlows
      ? {
          ...prev,
          [key]: serviceFlows.getInitialState(),
        }
      : prev;
  }, state);

  const sagaMiddlewares = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddlewares);

  const _store = createStore(
    reducer,
    preloadedState,
    (window as IWindow).__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
          middlewares,
          (window as IWindow).__REDUX_DEVTOOLS_EXTENSION__!()
        )
      : middlewares
  );

  Object.keys(services).forEach((key) => {
    const _sagas = services[key].sagas;
    if (_sagas) {
      sagaMiddlewares.run(_sagas);
    }
  });

  sagas.forEach((saga) => {
    sagaMiddlewares.run(saga);
  });

  return _store;
};

const store = storeFactory({ services: ImplementedServices });

export default store;
