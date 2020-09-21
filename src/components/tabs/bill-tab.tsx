import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IRootState } from "../../services";
import { flows as BillService } from "../../services/bill-service";
import { BaseBillTab } from "./base-bill-tab";

export const BillTab = BaseBillTab;

const mapStateToProps = (state: IRootState) => ({
  bills: state.BillService.getBills.data,
  fetching: state.BillService.getBills.fetching,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      getBills: BillService.getFlow("getBills").request,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillTab);
