import ListItem from "@mui/material/ListItem";
import withStyles from "@mui/styles/withStyles";
import { Theme } from "@mui/material";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import Phone from "@mui/icons-material/Phone";

export const StyledListItem = withStyles((theme: Theme) => ({
  root: {
    padding: ".25rem 0",
    textTransform: "capitalize",

    "& a": {
      textDecoration: "none",
      fontWeight: "bold",
      color: "inherit",

      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
}))(ListItem);

export const socialContact = [
  {
    Icon: Facebook,
    href: "/",
    color: "#1877F2",
  },
  {
    Icon: Twitter,
    href: "/",
    color: "#1DA1F2",
  },
  {
    Icon: Instagram,
    href: "/",
    color: "#E4405F",
  },
  {
    Icon: Phone,
    href: "/",
    color: "#00C300",
  },
];
