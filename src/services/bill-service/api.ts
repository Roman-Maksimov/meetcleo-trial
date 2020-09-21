import api from "../../api";
import { IBill } from "./index";

export const apiGetBills = (isBill?: boolean) =>
  api.get("/bills", isBill != null ? { params: { isBill } } : undefined);
export const apiUpdateBill = (id: string, data: Partial<IBill>) =>
  api.patch(`/bills/${id}`, data);
