import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IRootState } from "../../services";
import { flows as BillService, IBill } from "../../services/bill-service";
import { IGetBillsAction } from "../../services/bill-service/sagas";
import Bill from "../bill/bill";
import BaseTab, { IBaseTabProps } from "./base-tab";

export interface IBaseBillTabProps extends IBaseTabProps {
  bills: IBill[];
  actions: {
    getBills: IGetBillsAction;
  };
}

export const BaseBillTab = ({
  value,
  index,
  bills,
  fetching,
  actions,
}: IBaseBillTabProps) => {
  useEffect(() => {
    if (value === index) {
      actions.getBills();
    }
  }, [value, index, actions]);

  return (
    <BaseTab value={value} index={index} fetching={fetching}>
      {bills.map((item) => (
        <Bill key={item.id} data={item} />
      ))}
    </BaseTab>
  );
};

const mapStateToProps = (state: IRootState) => ({
  bills: state.BillService.getAllBills.data,
  fetching: state.BillService.getAllBills.fetching,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      getBills: BillService.getFlow("getAllBills").request,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseBillTab);
