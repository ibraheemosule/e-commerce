import ListItem from "@mui/material/ListItem";
import withStyles from "@mui/styles/withStyles";
import { Theme } from "@mui/material";

export const StyledListItem = withStyles((theme: Theme) => ({
  root: {
    padding: ".25rem 0",
    textTransform: "capitalize",

    "& a": {
      display: "block",
      width: "100%",
      textDecoration: "none",
      fontWeight: "bold",
      color: "inherit",

      "&:hover": {
        color: theme.palette.primary.light,
      },
    },
  },
}))(ListItem);
