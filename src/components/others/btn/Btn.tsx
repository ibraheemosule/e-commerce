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

export const btnClasses =
  "MuiButtonBase-root MuiButton-root ForwardRef(Button)-root-1 MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-root ForwardRef(Button)-root-1 MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation css-uyvtnh-MuiButtonBase-root-MuiButton-root";
