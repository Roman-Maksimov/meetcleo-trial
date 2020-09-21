import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import theme from "../../theme";
import Main from "../main/main";

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  </Provider>
);

export default App;
