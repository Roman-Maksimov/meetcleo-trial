import { configure, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import { fakeState } from "../../../testing-data/fake-data";
import { storeFactory } from "../../redux/store";
import services from "../../services";
import BillTabConnected from "./bill-tab";

configure({ adapter: new Adapter() });

describe("BillTab", () => {
  let store = storeFactory({ services, state: fakeState });

  beforeEach(() => {
    store = storeFactory({ services, state: fakeState });
  });

  it("should render Bills tab", () => {
    const component = render(
      <Provider store={store}>
        <BillTabConnected value={0} index={0} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
