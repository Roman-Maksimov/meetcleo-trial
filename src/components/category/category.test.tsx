import { configure, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import { fakeState } from "../../../testing-data/fake-data";
import { storeFactory } from "../../redux/store";
import services from "../../services";
import CategoryConnected from "./category";

configure({ adapter: new Adapter() });

describe("Category", () => {
  let store = storeFactory({ services, state: fakeState });

  beforeEach(() => {
    store = storeFactory({ services, state: fakeState });
  });

  it("should render chip with Phone category", () => {
    const component = render(
      <Provider store={store}>
        <CategoryConnected id={1} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("should render chip with TV category", () => {
    const component = render(
      <Provider store={store}>
        <CategoryConnected id={2} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
