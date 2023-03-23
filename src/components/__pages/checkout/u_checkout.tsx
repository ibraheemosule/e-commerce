export const payButtonWrapperStyles = {
  display: "flex",
  flexWrap: "wrap",
  rowGap: 1,
  alignItems: "center",
  mt: 1,
  ".MuiButton-root": {
    padding: ".5rem 2rem",
    border: 0,
    outline: 0,
    borderRadius: "5px",
    fontWeight: 500,
    fontSize: "1rem",
    cursor: "pointer",
  },
  ".pay-btn": {
    all: "unset",
    cursor: "pointer",
    boxSizing: "border-box",
    display: "inline-flex",
    padding: "6px 1.5rem",
    color: "inherit",
    fontWeight: 500,
    textTransform: "uppercase",
    borderRadius: 1,
    fontSize: 14,
    backgroundColor: "#fca311",
    transition: "background-color .2s ease-in",

    "&:hover": {
      backgroundColor: "rgb(176, 114, 11)",
    },
  },
};
