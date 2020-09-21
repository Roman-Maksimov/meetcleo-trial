import { Box, CircularProgress, withStyles } from "@material-ui/core";
import React, { ReactNode } from "react";
import styles, { IBaseTabClasses } from "./base-tab-styles";

export interface IBaseTabProps {
  children?: Readonly<ReactNode>;
  value: number;
  index: number;
  fetching?: boolean;
  classes?: IBaseTabClasses;
}

export const BaseTab = ({
  children,
  value,
  index,
  fetching,
  classes,
  ...other
}: IBaseTabProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box p={3}>
        {fetching ? (
          <div className={classes?.loader}>
            <CircularProgress />
          </div>
        ) : (
          children
        )}
      </Box>
    )}
  </div>
);

export default withStyles(styles)(BaseTab);
