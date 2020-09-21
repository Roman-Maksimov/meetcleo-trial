import { configure, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { connect, Provider } from "react-redux";
import { fakeState } from "../../../testing-data/fake-data";
import { storeFactory } from "../../redux/store";
import services, { IRootState } from "../../services";
import { flows as BillService } from "../../services/bill-service";
import BillActionsConnected, {
  BillActions,
  IBillActionsProps,
} from "./bill-actions";

configure({ adapter: new Adapter() });

describe("BillActions", () => {
  let store = storeFactory({ services, state: fakeState });

  beforeEach(() => {
    store = storeFactory({ services, state: fakeState });
  });

  it("BillActions: isBill === true", () => {
    const component = render(
      <Provider store={store}>
        <BillActionsConnected data={fakeState.BillService.getBills.data[0]} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("BillActions: isBill === false", () => {
    const component = render(
      <Provider store={store}>
        <BillActionsConnected data={fakeState.BillService.getPBills.data[0]} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("should patch a Bill by isBill: false if it was true before", () => {
    const updateBillMock = jest.fn(BillService.getFlow("updateBill").request);

    const mapStateToProps = (state: IRootState, props: IBillActionsProps) => ({
      fetching: state.BillService.updateBill.data[props.data.id],
    });

    const mapDispatchToProps = () => ({
      actions: {
        updateBill: updateBillMock,
      },
    });

    const Connected = connect(mapStateToProps, mapDispatchToProps)(BillActions);

    const data = fakeState.BillService.getBills.data[0];

    const component = mount(
      <Provider store={store}>
        <Connected data={data} />
      </Provider>
    );

    const updateBillSpy = jest.spyOn(
      (BillActions.prototype as unknown) as { updateBill: () => void },
      "updateBill"
    );

    component.find(".MuiIconButton-root").first().simulate("click");

    expect(updateBillSpy).toHaveBeenCalledWith(false);

    expect(updateBillMock).toHaveBeenCalledWith({
      id: data.id,
      payload: { isBill: false },
      requestBills: true,
      requestPBills: false,
    });
  });

  it("should patch a Bill by isBill: true if it was false before", () => {
    const updateBillMock = jest.fn(BillService.getFlow("updateBill").request);

    const mapStateToProps = (state: IRootState, props: IBillActionsProps) => ({
      fetching: state.BillService.updateBill.data[props.data.id],
    });

    const mapDispatchToProps = () => ({
      actions: {
        updateBill: updateBillMock,
      },
    });

    const Connected = connect(mapStateToProps, mapDispatchToProps)(BillActions);

    const data = fakeState.BillService.getPBills.data[0];

    const component = mount(
      <Provider store={store}>
        <Connected data={data} />
      </Provider>
    );

    const updateBillSpy = jest.spyOn(
      (BillActions.prototype as unknown) as { updateBill: () => void },
      "updateBill"
    );

    component.find(".MuiIconButton-root").first().simulate("click");

    expect(updateBillSpy).toHaveBeenCalledWith(true);

    expect(updateBillMock).toHaveBeenCalledWith({
      id: data.id,
      payload: { isBill: true },
      requestBills: false,
      requestPBills: true,
    });
  });
});
