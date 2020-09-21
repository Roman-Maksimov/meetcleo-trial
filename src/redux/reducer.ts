import { Action } from "redux";
import { FlowList } from "./flow";
import { IAction, IState } from "./interfaces";

export default ({
  initialState = {},
  handlers = {},
  flows = new FlowList(),
}) => {
  flows.mergeInitialState(initialState);

  return (state = flows.getInitialState(), action: Action<string>) => {
    const composed: {
      [name: string]: (state: IState, action: IAction) => void;
    } = {
      ...flows.getReducers(),
      ...handlers,
    };

    return composed[action.type] ? composed[action.type](state, action) : state;
  };
};
