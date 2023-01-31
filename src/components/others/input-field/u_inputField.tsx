export const textFieldStyles = (mode?: "dark", password?: string) => {
  const paddingRight = password ? 3 : "";
  return {
    my: 1,
    width: "100%",
    maxWidth: "25ch",

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

      // ".css-p8oq15-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
      //   {
      //     borderBottom: "2px solid primary.main",
      //   },

      // ".css-p8oq15-MuiInputBase-root-MuiInput-root:before": {
      //   borderBottom: "1px solid primary.main",
      // },

      "&:hover": {
        borderBottom: "1px solid",
        borderColor: mode ? "primary.main" : "primary.dark",

        ".MuiOutlinedInput-notchedOutline": {
          borderColor: mode ? "primary.light" : "primary.dark",
        },

        // ".css-p8oq15-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
        //   {
        //     borderBottom: "2px solid white",
        //   },

        // ".css-p8oq15-MuiInputBase-root-MuiInput-root:before": {
        //   borderBottom: "1px solid white",
        // },
      },
    },

    ".css-38xitx, .css-1p84xpi:before, .css-p8oq15-MuiInputBase-root-MuiInput-root:before, .css-tssygb-MuiInputBase-root-MuiInput-root:before ":
      {
        //borderBottom: `2px solid`,
        borderColor: mode ? "primary.main" : "primary.dark",
      },

    ".css-1p84xpi:hover:not(.Mui-disabled, .Mui-error):before, .css-p8oq15-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before, .css-tssygb-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
      {
        // borderBottom: "1px solid",
        // borderColor: mode ? "primary.light" : "#000000",
      },

    ".css-p8oq15-MuiInputBase-root-MuiInput-root:after": {
      borderColor: mode ? "primary.main" : "primary.dark",
    },

    "& input, & textarea": {
      color: mode ? "primary.main" : "primary.dark",
      pr: paddingRight,
    },
  };
};
