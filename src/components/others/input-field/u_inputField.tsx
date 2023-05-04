export const textFieldStyles = (mode?: "dark", password?: string) => {
  const paddingRight = password ? 3 : "";

  return {
    my: 1,
    width: "100%",
    ".css-1pt9orv-MuiFormLabel-root-MuiInputLabel-root": {
      color: mode ? "primary.main" : "primary.dark",
    },

    "#standard-size-small-label, .css-ifo6to": {
      color: mode ? "primary.main" : "primary.dark",
    },
    ".css-1njqvka": {
      color: mode ? "primary.main" : "primary.dark",
    },

    ".css-cskmko-MuiFormLabel-root-MuiInputLabel-root": {
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

      "&:after": {
        borderColor: mode ? "primary.main" : "primary.dark",
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

    ".css-j07ig8-MuiFormLabel-root-MuiInputLabel-root": {
      color: mode ? "primary.light" : "primary.dark",
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
