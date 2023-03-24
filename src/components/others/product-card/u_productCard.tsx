import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const ImgBtn = styled(Box)(({ theme }) => ({
  position: "relative",
  height: 450,
  width: "100%",
  overflow: "hidden",

  "& aside": {
    backgroundColor: "rgba(20,33,61,0.6)",
    transition: [theme.transitions.create("background-color")],
  },
  [theme.breakpoints.down("lg")]: {
    height: 375,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
  },
  borderColor: theme.palette.secondary.main,

  "& .title": {
    display: "block",
    textDecoration: "none",
    color: "inherit",
    textTransform: "capitalize",
    position: "relative",
    fontSize: theme.spacing(3),
  },

  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .title": {
      padding: "0 10px",
      border: `4px solid ${theme.palette.secondary.main}`,
    },
    "& aside": {
      bottom: "0%",
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const Img = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

export const ImgBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

export const ImgMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.secondary.main,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export const genderStyle = {
  display: "block",
  height: "100%",
  aspectRatio: "1/1",
  textTransform: "capitalize",
  borderRadius: "100%",
  backgroundColor: "rgba(255,255,255, 0.7)",
  color: "primary.dark",
  fontWeight: 600,
  fontSize: 18,
};
