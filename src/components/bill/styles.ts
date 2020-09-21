import theme from "../../theme";

export interface IBillClasses {
  bill: string;
  heading: string;
  icon: string;
  name: string;
  actions: string;
  category: string;
  transactions: string;
  actionLoader: string;
}

export default {
  bill: {
    width: "100%",
  },
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  icon: {
    flex: "0 0 auto",
    marginRight: theme.spacing(),
  },
  name: {
    flex: "1 1 auto",
  },
  actions: {
    flex: "0 0 auto",
    padding: `0 ${theme.spacing()}px`,
  },
  category: {
    flex: "0 0 auto",
    justifySelf: "flex-end",
  },
  transactions: {
    width: `calc(100% + ${theme.spacing(4)}px)`,
    marginLeft: -theme.spacing(2),
    marginRight: -theme.spacing(2),
  },
  actionLoader: {
    position: "absolute" as const,
    marginTop: 12,
    marginLeft: -36,
    zIndex: 1,
  },
};
