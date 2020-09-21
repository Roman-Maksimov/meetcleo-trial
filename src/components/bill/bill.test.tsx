import { configure, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { connect, Provider } from "react-redux";
import { fakeState } from "../../../testing-data/fake-data";
import { storeFactory } from "../../redux/store";
import services, { IRootState } from "../../services";
import { toggleBill } from "../../services/bill-service/actions";
import BillConnected, { Bill, IBillProps } from "./bill";

configure({ adapter: new Adapter() });

describe("Bill", () => {
  let store = storeFactory({ services, state: fakeState });

  beforeEach(() => {
    store = storeFactory({ services, state: fakeState });
  });

  it("Bill: isBill === true", () => {
    const component = render(
      <Provider store={store}>
        <BillConnected data={fakeState.BillService.getBills.data[0]} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("Bill: isBill === false", () => {
    const component = render(
      <Provider store={store}>
        <BillConnected data={fakeState.BillService.getPBills.data[0]} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("should call toggleBill action", () => {
    const toggleBillMock = jest.fn(toggleBill);

    const mapStateToProps = (state: IRootState, props: IBillProps) => ({
      expanded: state.BillService.expanded[props.data.id],
    });

    const mapDispatchToProps = () => ({
      actions: {
        toggleBill: toggleBillMock,
      },
    });

    const Connected = connect(mapStateToProps, mapDispatchToProps)(Bill);

    const component = mount(
      <Provider store={store}>
        <Connected data={fakeState.BillService.getBills.data[0]} />
      </Provider>
    );

    component.find(".MuiAccordionSummary-root").first().simulate("click");

    expect(toggleBillMock).toHaveBeenCalledWith(
      fakeState.BillService.getBills.data[0].id,
      true
    );
  });
});
