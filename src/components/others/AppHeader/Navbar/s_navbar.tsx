export const linkWrapperStyles = {
  display: { xs: "none", md: "flex" },
  flexGrow: 1,
  justifyContent: "center",
  gap: "2rem",

  "& a": {
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    color: "primary.main",

    "&:hover": {
      color: "primary.light",
    },
  },
};
