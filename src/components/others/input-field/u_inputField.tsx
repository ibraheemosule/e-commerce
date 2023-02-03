export const textFieldStyles = (mode?: "dark", password?: string) => {
  const paddingRight = password ? 3 : "";

  return {
    my: 1,
    width: "100%",

    "#standard-size-small-label": {
      color: mode ? "primary.main" : "primary.dark",
    },

    div: {
      borderBottom: "1px solid",
      borderColor: mode ? "primary.main" : "primary.dark",

      fieldset: {
        borderColor: mode ? "primary.main" : "primary.dark",
        "&:focus-visible": {
          outline: "none",
        },
      },

      ".MuiInputBase-root": {
        backgroundColor: "red !important",
        height: 50,
        width: 50,
      },

      "&:hover": {
        borderBottom: "1px solid",
        borderColor: mode ? "primary.main" : "primary.dark",

        ".MuiOutlinedInput-notchedOutline": {
          borderColor: mode ? "primary.light" : "primary.dark",
        },
      },
    },

    ".MuiInputBase-root": {
      "&:before": {
        display: "none",
      },
    },

    ".css-2tbih4-MuiFormLabel-root-MuiInputLabel-root": {
      color: mode ? "primary.main" : "primary.dark",
    },

    // ".css-38xitx, .css-1p84xpi:before, .css-p8oq15-MuiInputBase-root-MuiInput-root:before, .css-tssygb-MuiInputBase-root-MuiInput-root:before ":
    //   {
    //     borderColor: mode ? "primary.main" : "primary.dark",
    //   },

    ".css-p8oq15-MuiInputBase-root-MuiInput-root:after": {
      borderColor: mode ? "primary.main" : "primary.dark",
    },

    "& input, & textarea": {
      color: mode ? "primary.main" : "primary.dark",
      pr: paddingRight,
    },
  };
};
