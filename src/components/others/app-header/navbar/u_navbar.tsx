export const linkWrapperStyles = (active: number) => ({
  display: { xs: "none", md: "flex" },
  flexGrow: 1,
  justifyContent: "center",
  gap: "2rem",

  "& a": {
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    color: "primary.main",
    position: "relative",

    [`&:nth-of-type(${active}):after`]: {
      content: "''",
      position: "absolute",
      display: "block",
      bottom: "-30%",
      left: "50%",
      transform: "translate(-50%)",
      height: "2px",
      width: "50%",
      backgroundColor: "secondary.main",
    },

    "&:hover": {
      color: "primary.light",

      "&:after": {
        display: "block",
        content: "''",
        position: "absolute",
        bottom: "-30%",
        left: "50%",
        transform: "translate(-50%)",
        height: "2px",
        width: "50%",
        backgroundColor: "secondary.main",
      },
    },
  },
});
