const borderBottom = {
  content: "''",
  position: "absolute",
  display: "block",
  bottom: "-30%",
  left: "50%",
  transform: "translate(-50%)",
  height: "2px",
  width: "50%",
  backgroundColor: "secondary.main",
};

export const linkWrapperStyles = (active: number) => ({
  display: { xs: "none", md: "flex" },
  flexGrow: 1,
  justifyContent: "center",
  gap: "2rem",

  "& .nav-item": {
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    color: "primary.main",
    position: "relative",
    textTransform: "capitalize",
    cursor: "pointer",

    [`&:nth-of-type(${active}):after`]: borderBottom,

    "&:hover": {
      color: "primary.light",

      "&:after": borderBottom,
    },
  },
});

export const productsNavStyle = {
  color: "inherit",
  textDecoration: "none",
  display: "block",
};
