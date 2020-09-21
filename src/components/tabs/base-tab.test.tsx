import { configure, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import { fakeState } from "../../../testing-data/fake-data";
import { storeFactory } from "../../redux/store";
import services from "../../services";
import BaseTabConnected from "./base-tab";

configure({ adapter: new Adapter() });

describe("BaseTab", () => {
  let store = storeFactory({ services, state: fakeState });

  beforeEach(() => {
    store = storeFactory({ services, state: fakeState });
  });

  it("should render active tab component", () => {
    const component = render(
      <Provider store={store}>
        <BaseTabConnected value={0} index={0} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("should render inactive tab component", () => {
    const component = render(
      <Provider store={store}>
        <BaseTabConnected value={0} index={1} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
