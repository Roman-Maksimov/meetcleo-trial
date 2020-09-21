import redux from "../../redux";
import { FlowList } from "../../redux/flow";

export default (flows: FlowList) => redux.reducer({ flows });
