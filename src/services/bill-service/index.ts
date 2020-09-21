import redux from "../../redux";
import { IFlowState, IService } from "../../redux/interfaces";
import reducerFactory, { IBillServiceReducerState } from "./reducer";
import sagasFactory from "./sagas";

export const flows = new redux.FlowList(
  new redux.Flow("getAllBills", []),
  new redux.Flow("getBills", []),
  new redux.Flow("getPBills", []),
  new redux.Flow("updateBill")
);
export const reducer = reducerFactory(flows);
export const sagas = sagasFactory(flows);

const service: IService = {
  flows,
  reducer,
  sagas,
};

export interface ITransaction {
  amount: number;
  date: string;
  id: number;
}

export interface IBill {
  categoryId: number;
  iconUrl?: string;
  id: string;
  isBill: boolean;
  name: string;
  transactions: ITransaction[];
}

export interface IBillServiceState extends IBillServiceReducerState {
  getAllBills: IFlowState<IBill[]>;
  getBills: IFlowState<IBill[]>;
  getPBills: IFlowState<IBill[]>;
  updateBill: IFlowState<{ [id: string]: boolean }>;
}

export default service;
