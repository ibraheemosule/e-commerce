import ListItem from "@mui/material/ListItem";
import withStyles from "@mui/styles/withStyles";
import { Theme } from "@mui/material";

const reusables = {
  display: "block",
  width: "100%",
  textDecoration: "none",
  fontSize: ".8rem",
};

export const StyledListItem = withStyles((theme: Theme) => ({
  root: {
    textTransform: "capitalize",
    "& a": {
      ...reusables,
      fontWeight: "bold",
      color: theme.palette.primary.dark,

      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
}))(ListItem);

export const productLinkStyle = {
  ...reusables,
  fontWeight: "inherit",
  color: "inherit",

  "&:hover": {
    color: "inherit",
  },
};
