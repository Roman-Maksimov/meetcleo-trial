import { call, put } from "redux-saga/effects";
import { FlowList } from "../../redux/flow";
import { IAction } from "../../redux/interfaces";
import { apiGetBills, apiUpdateBill } from "./api";
import { IBill } from "./index";

export interface IUpdateBillProps {
  id: string;
  payload: Partial<IBill>;
  requestBills?: boolean;
  requestPBills?: boolean;
}

export type IUpdateBillActionParam = IAction & IUpdateBillProps;

export type IGetBillsAction = () => void;
export type IUpdateBillAction = (props: IUpdateBillProps) => void;

export default (flows: FlowList) => {
  flows.getFlows().getAllBills.setActions({
    *onFetch() {
      const { data } = yield call(() => apiGetBills());
      return data;
    },
  });

  flows.getFlows().getBills.setActions({
    *onFetch() {
      const { data } = yield call(() => apiGetBills(true));
      return data;
    },
  });

  flows.getFlows().getPBills.setActions({
    *onFetch() {
      const { data } = yield call(() => apiGetBills(false));
      return data;
    },
  });

  flows.getFlows().updateBill.setActions({
    *onFetch(a, flow) {
      const action = a as IUpdateBillActionParam;
      const state = { ...flow.getInitialState(), [action.id]: true };

      yield put(flow.setData(state));

      yield call(() => apiUpdateBill(action.id, action.payload));

      if (action.requestBills) {
        yield put(flows.getFlow("getBills").request());
      }

      if (action.requestPBills) {
        yield put(flows.getFlow("getPBills").request());
      }

      return Object.keys(state).reduce(
        (prev, key) =>
          key === action.id ? prev : { ...prev, [key]: state[key] },
        {}
      );
    },
  });

  return flows.getSagas();
};
