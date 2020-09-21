import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IRootState } from "../../services";
import { flows as BillService } from "../../services/bill-service";
import { BaseBillTab } from "./base-bill-tab";

export const PBillTab = BaseBillTab;

const mapStateToProps = (state: IRootState) => ({
  bills: state.BillService.getPBills.data,
  fetching: state.BillService.getPBills.fetching,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      getBills: BillService.getFlow("getPBills").request,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PBillTab);
