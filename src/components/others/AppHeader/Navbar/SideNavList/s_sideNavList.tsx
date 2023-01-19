import ListItem from "@mui/material/ListItem";
import { withStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const StyledListItem = withStyles((theme: Theme) => ({
  root: {
    "& a": {
      display: "block",
      width: "100%",
      textDecoration: "none",
      fontSize: ".8rem",
      fontWeight: "bold",
      color: theme.palette.primary.dark,

      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
}))(ListItem);
