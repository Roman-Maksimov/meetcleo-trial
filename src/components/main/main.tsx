import { AppBar, Tab, Tabs } from "@material-ui/core";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IRootState } from "../../services";
import { ISetTabAction, setTab } from "../../services/bill-service/actions";
import { flows as CategoriesService } from "../../services/categories-service";
import { IGet as IGetCategories } from "../../services/categories-service/sagas";
import BillTab from "../tabs/bill-tab";
import PBillTab from "../tabs/pbill-tab";

interface IMainProps {
  tab: number;
  actions: {
    setTab: ISetTabAction;
    getCategories: IGetCategories;
  };
}

export class Main extends PureComponent<IMainProps> {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  private onTabChange = (event: React.ChangeEvent<{}>, index: number) => {
    this.props.actions.setTab(index);
  };

  public render() {
    const { tab } = this.props;

    return (
      <main>
        <AppBar position="static">
          <Tabs
            value={tab}
            onChange={this.onTabChange}
            aria-label="Transactions type selection"
          >
            <Tab label="Bills" id="tab-bills" aria-controls="tabpanel-bills" />
            <Tab
              label="Potential Bills"
              id="tab-pbills"
              aria-controls="tabpanel-pbills"
            />
          </Tabs>
        </AppBar>
        <BillTab value={tab} index={0} />
        <PBillTab value={tab} index={1} />
      </main>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  tab: state.BillService.tab,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      setTab,
      getCategories: CategoriesService.getFlow("get").request,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
