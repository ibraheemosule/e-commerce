import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";
import { Theme } from "@mui/material";

export default withStyles((theme: Theme) => ({
  root: {
    margin: ".75rem 0",
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}))(Button);
