import * as flow from "./flow";
import _reducer from "./reducer";
import _store from "./store";

export const { Flow, FlowList } = flow;
export const reducer = _reducer;
export const store = _store;

export default {
  Flow,
  FlowList,
  reducer,
  store,
};
