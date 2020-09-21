import { call } from "redux-saga/effects";
import { FlowList } from "../../redux/flow";
import { apiGetCategories } from "./api";
import { ICategory } from "./index";

export type IGet = () => void;

export default (flows: FlowList) => {
  flows.getFlows().get.setActions({
    *onFetch() {
      const { data } = yield call(() => apiGetCategories());

      return (data as ICategory[]).reduce(
        (prev, item) => ({
          ...prev,
          [item.id]: item,
        }),
        {}
      );
    },
  });

  return flows.getSagas();
};
