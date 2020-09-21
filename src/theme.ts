import { createMuiTheme } from "@material-ui/core/styles";
import { StyleConstants } from "./shared/constants";

const theme = createMuiTheme({
  palette: {
    primary: StyleConstants.colors.blue,
    secondary: StyleConstants.colors.yellow,
  },
});

export default theme;
