export const textFieldStyles = (mode?: "dark") => {
  return {
    my: 1,
    color: "red",
    maxWidth: "30ch",

    "#standard-size-small-label": {
      color: mode ? "primary.main" : "primary.dark",
    },

    div: {
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
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: mode ? "primary.light" : "#000000",
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

    ".css-p8oq15-MuiInputBase-root-MuiInput-root:before, .css-tssygb-MuiInputBase-root-MuiInput-root:before ":
      {
        borderBottom: `2px solid`,
        borderColor: mode ? "primary.main" : "primary.dark",
      },

    ".css-p8oq15-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before, .css-tssygb-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
      {
        borderBottom: "1px solid",
        borderColor: mode ? "primary.light" : "#000000",
      },

    input: {
      color: mode ? "primary.main" : "primary.dark",

      "&:focus": {
        label: {
          color: "red",
        },
      },
    },
  };
};
