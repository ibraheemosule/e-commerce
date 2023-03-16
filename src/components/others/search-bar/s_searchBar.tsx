import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  backgroundColor: alpha(theme.palette.common.white, 0.15),

  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "inherit",
  opacity: 0.5,
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("xs")]: {
      width: "10ch",
      "&:focus": {
        width: "14ch",
      },
    },
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const listStyle = {
  zIndex: 2,
  backgroundColor: "primary.light",
  color: "primary.dark",
  borderRadius: 1,
  position: "absolute",
  maxHeight: "150px",
  overflowY: "scroll",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  boxShadow: "2px 5px 46px -14px rgba(0,0,0,1)",
  webkitBoxShadow: "2px 5px 46px -14px rgba(0,0,0,1)",
  mozBoxShadow: "2px 5px 46px -14px rgba(0,0,0,1)",
  ".css-fbv8zl-MuiTypography-root": {
    color: "primary.dark",
  },
  top: "130%",
  width: "100%",
  left: "0%",
};
