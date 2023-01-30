export const linkWrapperStyles = {
  display: { xs: "none", md: "flex" },
  flexGrow: 1,
  justifyContent: "center",
  gap: "2rem",

  "& a": {
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    color: "secondary.main",

    "&:hover": {
      color: "secondary.dark",
    },
  },
};
