import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";
import { Theme } from "@mui/material";

export default withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.secondary.main,
    width: "unset",
    minWidth: "unset",
    paddingRight: 24,
    paddingLeft: 24,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}))(Button);
