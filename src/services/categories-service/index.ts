import redux from "../../redux";
import { IFlowState, IService } from "../../redux/interfaces";
import reducerFactory from "./reducer";
import sagasFactory from "./sagas";

export const flows = new redux.FlowList(new redux.Flow("get", []));
export const reducer = reducerFactory(flows);
export const sagas = sagasFactory(flows);

const service: IService = {
  flows,
  reducer,
  sagas,
};

export interface ICategory {
  iconUrl?: string;
  id: number;
  name: string;
}

export interface ICategoriesService {
  get: IFlowState<{ [id: number]: ICategory }>;
}

export default service;
