import BillService, { IBillServiceState } from "./bill-service";
import CategoriesService, { ICategoriesService } from "./categories-service";

export interface IRootState {
  BillService: IBillServiceState;
  CategoriesService: ICategoriesService;
}

export default {
  BillService,
  CategoriesService,
};
