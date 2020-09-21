import { ActionPattern } from "@redux-saga/types";
import { v4 } from "uuid";
import { takeEvery, all, put } from "redux-saga/effects";
import {
  IAction,
  IErrorAction,
  IFlowListSaga,
  IFlowType,
  IFormatError,
  IOnDone,
  IOnFail,
  IOnFetch,
  ISetActionsParams,
  ISetPropsAction,
  IState,
} from "./interfaces";

export const createFlowType = (type: string): IFlowType => ({
  request: `${type}/REQUEST`,
  success: `${type}/SUCCESS`,
  fail: `${type}/FAIL`,
  setData: `${type}/SET_DATA`,
  setProps: `${type}/SET_PROPS`,
  reset: `${type}/RESET`,
});

export class Flow {
  private name: string;
  private type: IFlowType;
  private initialData: unknown;

  private onFetch?: IOnFetch;
  private onFail?: IOnFail;
  private onDone?: IOnDone;
  private formatError?: IFormatError;

  constructor(name: string, initialData = {}) {
    this.name = name;
    this.type = createFlowType(`${v4()}/${name}`);
    this.initialData = initialData;
  }

  getName = () => this.name;

  request = (props = {}) => ({
    ...props,
    type: this.type.request,
  });

  success = (payload: unknown) => ({
    type: this.type.success,
    payload,
  });

  fail = (error: Error, formattedError: string) => ({
    type: this.type.fail,
    error,
    formattedError,
  });

  setData = (payload: unknown) => ({
    type: this.type.setData,
    payload,
  });

  setProps = (payload: unknown) => ({
    type: this.type.setProps,
    payload,
  });

  reset = () => ({
    type: this.type.reset,
  });

  reducerRequest = (state: { [name: string]: IState }) => ({
    ...state,
    [this.name]: {
      ...state[this.name],
      data: this.initialData,
      fetching: true,
      error: null,
      formattedError: null,
    },
  });

  reducerSuccess = (state: { [name: string]: IState }, action: IAction) => ({
    ...state,
    [this.name]: {
      ...state[this.name],
      data: action.payload,
      fetching: false,
      error: null,
      formattedError: null,
    },
  });

  reducerFail = (state: { [name: string]: IState }, action: IErrorAction) => ({
    ...state,
    [this.name]: {
      ...state[this.name],
      data: this.initialData,
      fetching: false,
      error: action.error,
      formattedError: action.formattedError,
    },
  });

  reducerSetData = (state: { [name: string]: IState }, action: IAction) => ({
    ...state,
    [this.name]: {
      ...state[this.name],
      data: action.payload,
    },
  });

  reducerSetProps = (
    state: { [name: string]: IState },
    action: ISetPropsAction
  ) => ({
    ...state,
    [this.name]: {
      ...state[this.name],
      ...action.payload,
    },
  });

  reducerReset = (state: IState) => ({
    ...state,
    ...this.getInitialState(),
  });

  getInitialState = () => ({
    [this.name]: {
      data: this.initialData,
      fetching: false,
      error: null,
    },
  });

  getReducers = () => ({
    [this.type.request]: this.reducerRequest,
    [this.type.success]: this.reducerSuccess,
    [this.type.fail]: this.reducerFail,
    [this.type.setData]: this.reducerSetData,
    [this.type.setProps]: this.reducerSetProps,
    [this.type.reset]: this.reducerReset,
  });

  getSaga = () => {
    const self = this;

    function* fetch(action: IAction) {
      try {
        const payload =
          self.onFetch && typeof self.onFetch === "function"
            ? yield self.onFetch(action, self)
            : undefined;

        yield put(self.success(payload || self.initialData));
      } catch (error) {
        const payload = [];

        if (typeof error === "string") {
          payload.push(error);
        }

        if (error.message) {
          payload.push(error.message);
        }

        if (error.response) {
          payload.push(error.response.data);
        }

        let formattedError = payload.join(" \n ");

        if (self.formatError) {
          formattedError = yield self.formatError(error, formattedError);
        }

        if (self.onFail && typeof self.onFail === "function") {
          const fError = yield self.onFail(action, error, formattedError);

          if (fError !== undefined) {
            formattedError = fError;
          }
        }

        // tslint:disable-next-line
        console.error(error);

        // ToDo add auditLog here

        yield put(self.fail(error, formattedError));
      } finally {
        if (self.onDone && typeof self.onDone === "function") {
          yield self.onDone(action);
        }
      }
    }

    function* watch() {
      yield takeEvery(self.type.request, fetch);
    }

    return watch();
  };

  setActions = ({
    onFetch,
    onFail,
    onDone,
    formatError,
  }: ISetActionsParams) => {
    this.onFetch = onFetch;
    this.onFail = onFail;
    this.onDone = onDone;
    this.formatError = formatError;
  };
}

// tslint:disable-next-line
export class FlowList {
  private flows: { [name: string]: Flow } = {};
  private sagas: IFlowListSaga[] = [];
  private initialState = {};

  constructor(...flows: Flow[]) {
    this.flows = flows.reduce(
      (prev, flow) => ({
        ...prev,
        [flow.getName()]: flow,
      }),
      {}
    );
  }

  getFlow = (name: string) => this.flows[name];

  getFlows = () => this.flows;

  getInitialState = () =>
    Object.keys(this.flows).reduce(
      (prev, key) => ({
        ...prev,
        ...this.flows[key].getInitialState(),
      }),
      this.initialState
    );

  mergeInitialState = (initialState = {}) => {
    this.initialState = initialState;
  };

  getReducers = () =>
    Object.keys(this.flows).reduce(
      (prev, key) => ({
        ...prev,
        ...this.flows[key].getReducers(),
      }),
      {}
    );

  watch = (
    type: ActionPattern<IAction>,
    saga: (action: IAction) => unknown
  ) => {
    this.sagas.push({
      watch: () => {
        function* gen() {
          return yield takeEvery(type, saga);
        }

        return gen();
      },
    });
  };

  getSagas = () => {
    const self = this;

    return function* root() {
      yield all([
        ...Object.keys(self.flows).map((key) => self.flows[key].getSaga()),
        ...self.sagas.map((item) => item.watch && item.watch()),
      ]);
    };
  };
}

export default Flow;
