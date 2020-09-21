import redux from "../../redux";
import { FlowList } from "../../redux/flow";
import { IActionFunc, IState } from "../../redux/interfaces";
import {
  actionTypes,
  ISetTabActionParam,
  IToggleBillActionParam,
} from "./actions";

export interface IBillServiceReducerState extends IState {
  tab: number;
  expanded: { [id: string]: boolean };
}

const initialState: IBillServiceReducerState = {
  tab: 0,
  expanded: {},
};

const handleSetTab: IActionFunc<
  IBillServiceReducerState,
  ISetTabActionParam
> = (state, action) => ({
  ...state,
  tab: action.payload,
});

const handleToggleBill: IActionFunc<
  IBillServiceReducerState,
  IToggleBillActionParam
> = (state, action) => ({
  ...state,
  expanded: {
    ...state.expanded,
    [action.id]: action.payload,
  },
});

const handlers = {
  [actionTypes.SET_TAB]: handleSetTab,
  [actionTypes.TOGGLE_BILL]: handleToggleBill,
};

export default (flows: FlowList) =>
  redux.reducer({ initialState, handlers, flows });
