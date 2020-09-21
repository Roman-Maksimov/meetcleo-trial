import { IAction } from "../../redux/interfaces";

export const actionTypes = {
  SET_TAB: "SET_TAB",
  TOGGLE_BILL: "TOGGLE_BILL",
};

/** SET_TAB */

export interface ISetTabActionParam extends IAction {
  payload: number;
}

export type ISetTabAction = (index: number) => ISetTabActionParam;
export const setTab: ISetTabAction = (index: number) => ({
  type: actionTypes.SET_TAB,
  payload: index,
});

/** TOGGLE_BILL */

export interface IToggleBillActionParam extends IAction {
  id: string;
  payload: boolean;
}

export type IToggleBillAction = (
  id: string,
  expanded: boolean
) => IToggleBillActionParam;
export const toggleBill: IToggleBillAction = (
  id: string,
  expanded: boolean
) => ({ type: actionTypes.TOGGLE_BILL, id, payload: expanded });
