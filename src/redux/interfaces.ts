import { Action } from "redux";
import { sagas } from "../services/bill-service";
import Flow, { FlowList } from "./flow";
import { Saga } from "redux-saga";

export interface IFlowType {
  request: string;
  success: string;
  fail: string;
  setData: string;
  setProps: string;
  reset: string;
}

export type IState = { [key: string]: unknown };

export interface IAction extends Action<string> {
  payload?: unknown;
}

export type IError = {
  message?: string;
  response?: {
    data?: unknown;
  };
};

export interface IErrorAction extends IAction {
  error: string | IError;
  formattedError: string;
}

export interface ISetPropsAction extends IAction {
  payload?: { [key: string]: unknown };
}

export type IActionFunc<
  S extends IState = IState,
  A extends IAction = IAction
> = (state: S, action: A) => S;

export type IOnFetch<A extends IAction = IAction> = (
  action: A,
  flow: Flow
) => void;

export type IOnFail<A extends IAction = IAction> = (
  action: A,
  error: IError,
  formatterError: string
) => void;

export type IOnDone<A extends IAction = IAction> = (action: A) => void;

export type IFormatError = (error: IError, formatterError: string) => void;

export interface ISetActionsParams {
  onFetch?: IOnFetch;
  onFail?: IOnFail;
  onDone?: IOnDone;
  formatError?: IFormatError;
}

export type IFlowListSaga = { [name: string]: (action: Action) => unknown } & {
  watch?: () => void;
};

export interface IFlowState<D = {}> {
  data: D;
  fetching: boolean;
  error: string | IError | null;
  formattedError: string | null;
}

export interface IService {
  flows: FlowList;
  reducer: (state: {} | undefined, action: IAction) => unknown;
  sagas?: Saga;
}

export interface IStoreFactoryParams {
  services?: { [name: string]: IService };
  reducers?: {
    [name: string]: (state: {} | undefined, action: IAction) => unknown;
  };
  sagas?: Saga[];
  state?: {};
}
