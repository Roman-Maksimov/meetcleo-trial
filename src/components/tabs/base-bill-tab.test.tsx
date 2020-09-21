import { configure, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { connect, Provider } from "react-redux";
import { fakeState } from "../../../testing-data/fake-data";
import { storeFactory } from "../../redux/store";
import services, { IRootState } from "../../services";
import { flows as BillService } from "../../services/bill-service";
import BaseBillTabConnected, { BaseBillTab } from "./base-bill-tab";

configure({ adapter: new Adapter() });

describe("BaseBillTab", () => {
  let store = storeFactory({ services, state: fakeState });

  beforeEach(() => {
    store = storeFactory({ services, state: fakeState });
  });

  it("should render tab", () => {
    const component = render(
      <Provider store={store}>
        <BaseBillTabConnected value={0} index={0} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("should request bills on mount", () => {
    const getBillsMock = jest.fn(BillService.getFlow("getAllBills").request);

    const mapStateToProps = (state: IRootState) => ({
      bills: state.BillService.getAllBills.data,
      fetching: state.BillService.getAllBills.fetching,
    });

    const mapDispatchToProps = () => ({
      actions: {
        getBills: getBillsMock,
      },
    });

    const Connected = connect(mapStateToProps, mapDispatchToProps)(BaseBillTab);

    mount(
      <Provider store={store}>
        <Connected value={0} index={0} />
      </Provider>
    );

    expect(getBillsMock).toHaveBeenCalledTimes(1);
  });
});
