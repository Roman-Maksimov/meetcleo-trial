import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IRootState } from "../../services";
import { IBill } from "../../services/bill-service";
import {
  IToggleBillAction,
  toggleBill,
} from "../../services/bill-service/actions";
import Category from "../category/category";
import BillActions from "./bill-actions";
import styles, { IBillClasses } from "./styles";

export interface IBillProps {
  data: IBill;
  expanded?: boolean;
  actions?: {
    toggleBill: IToggleBillAction;
  };
  classes?: IBillClasses;
}

export const Bill = ({ data, expanded, actions, classes }: IBillProps) => {
  const onToggle = (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    actions?.toggleBill(data.id, isExpanded);
  };

  return (
    <Accordion expanded={!!expanded} onChange={onToggle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="Bill summary"
      >
        <div className={classes?.heading}>
          <Avatar
            className={classes?.icon}
            alt={data.name}
            src={data.iconUrl}
          />
          <Typography className={classes?.name}>
            {data.name} ({data.transactions.length})
          </Typography>
          <div className={classes?.category}>
            <Category id={data.categoryId} />
          </div>
          <div className={classes?.actions}>
            <BillActions data={data} />
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Table
          classes={{ root: classes?.transactions }}
          size="small"
          aria-label="transactions"
        >
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell align="right">Amount (£)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.transactions.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.date}
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell align="right">{item.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};

const mapStateToProps = (state: IRootState, props: IBillProps) => ({
  expanded: state.BillService.expanded[props.data.id],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ toggleBill }, dispatch),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Bill)
);
