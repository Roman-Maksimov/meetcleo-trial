import { configure, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { connect, Provider } from "react-redux";
import { fakeState } from "../../../testing-data/fake-data";
import { storeFactory } from "../../redux/store";
import services, { IRootState } from "../../services";
import { setTab } from "../../services/bill-service/actions";
import { flows as CategoriesService } from "../../services/categories-service";
import MainConnected, { Main } from "./main";

configure({ adapter: new Adapter() });

describe("Main", () => {
  let store = storeFactory({ services, state: fakeState });

  beforeEach(() => {
    store = storeFactory({ services, state: fakeState });
  });

  it("should render Bills tab component", () => {
    const state = {
      ...fakeState,
      BillService: {
        ...fakeState.BillService,
        tab: 0,
      },
    };

    store = storeFactory({ services, state });

    const component = render(
      <Provider store={store}>
        <MainConnected />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("should render Potential Bills tab component", () => {
    const state = {
      ...fakeState,
      BillService: {
        ...fakeState.BillService,
        tab: 1,
      },
    };

    store = storeFactory({ services, state });

    const component = render(
      <Provider store={store}>
        <MainConnected />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("should request categories on mount", () => {
    const setTabMock = jest.fn(setTab);
    const getCategoriesMock = jest.fn(CategoriesService.getFlow("get").request);

    const mapStateToProps = (state: IRootState) => ({
      tab: state.BillService.tab,
    });

    const mapDispatchToProps = () => ({
      actions: {
        setTab: setTabMock,
        getCategories: getCategoriesMock,
      },
    });

    const Connected = connect(mapStateToProps, mapDispatchToProps)(Main);

    mount(
      <Provider store={store}>
        <Connected />
      </Provider>
    );

    expect(getCategoriesMock).toHaveBeenCalledTimes(1);
  });

  it("should switch tabs by click", () => {
    const setTabMock = jest.fn(setTab);
    const getCategoriesMock = jest.fn(CategoriesService.getFlow("get").request);

    const mapStateToProps = (state: IRootState) => ({
      tab: state.BillService.tab,
    });

    const mapDispatchToProps = () => ({
      actions: {
        setTab: setTabMock,
        getCategories: getCategoriesMock,
      },
    });

    const Connected = connect(mapStateToProps, mapDispatchToProps)(Main);

    const component = mount(
      <Provider store={store}>
        <Connected />
      </Provider>
    );

    component.find(".MuiTab-root").last().simulate("click");
    expect(setTabMock).toHaveBeenCalledWith(1);

    component.find(".MuiTab-root").first().simulate("click");
    expect(setTabMock).toHaveBeenCalledWith(0);
  });
});
