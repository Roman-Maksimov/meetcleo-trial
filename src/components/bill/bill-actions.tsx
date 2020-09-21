import {
  CircularProgress,
  IconButton,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IRootState } from "../../services";
import { flows as BillService, IBill } from "../../services/bill-service";
import { IUpdateBillAction } from "../../services/bill-service/sagas";
import styles, { IBillClasses } from "./styles";

export interface IBillActionsProps {
  data: IBill;
  fetching?: boolean;
  actions?: {
    updateBill: IUpdateBillAction;
  };
  classes?: IBillClasses;
}

export class BillActions extends React.PureComponent<IBillActionsProps> {
  private updateBill(isBill: boolean) {
    const { data, actions } = this.props;

    actions?.updateBill({
      id: data.id,
      payload: { isBill },
      requestBills: !isBill,
      requestPBills: isBill,
    });
  }

  private readonly addBill = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    this.updateBill(true);
  };

  private readonly removeBill = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    this.updateBill(false);
  };

  private renderBillActions() {
    const { fetching } = this.props;

    return (
      <Tooltip title="Remove bill" placement="top">
        <IconButton
          aria-label="Remove bill"
          component="span"
          disabled={fetching}
          onClick={this.removeBill}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    );
  }

  private renderPBillActions() {
    const { fetching } = this.props;

    return (
      <Tooltip title="Add as bill" placement="top">
        <IconButton
          aria-label="Add as bill"
          component="span"
          disabled={fetching}
          onClick={this.addBill}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    );
  }

  public render() {
    const { data, fetching, classes } = this.props;

    return (
      <>
        {data.isBill ? this.renderBillActions() : this.renderPBillActions()}
        {fetching && (
          <CircularProgress size={24} className={classes?.actionLoader} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: IRootState, props: IBillActionsProps) => ({
  fetching: state.BillService.updateBill.data[props.data.id],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      updateBill: BillService.getFlow("updateBill").request,
    },
    dispatch
  ),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(BillActions)
);
