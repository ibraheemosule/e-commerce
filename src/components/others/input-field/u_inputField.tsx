export const textFieldStyles = (mode?: "dark", password?: string) => {
  const paddingRight = password ? 3 : "";

  const color = mode ? "primary.main" : "primary.dark";

  return {
    my: 1,
    width: "100%",
    ".css-1pt9orv-MuiFormLabel-root-MuiInputLabel-root": {
      color,
    },

    "#standard-size-small-label": {
      color,
    },
    ".css-usigld-MuiFormLabel-root-MuiInputLabel-root": {
      color,
    },
    ".css-ifo6to": {
      color,
    },
    ".css-1njqvka": {
      color,
    },
    ".css-19136mp": {
      color,
    },

    ".css-cskmko-MuiFormLabel-root-MuiInputLabel-root": {
      color,
    },

    div: {
      borderBottom: "1px solid",
      borderColor: color,

      fieldset: {
        borderColor: color,
        "&:focus-visible": {
          outline: "none",
        },
      },

      "&:after": {
        borderColor: color,
      },

      "&:hover": {
        borderBottom: "1px solid",
        borderColor: color,

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
      color,
    },

    ".css-j07ig8-MuiFormLabel-root-MuiInputLabel-root": {
      color: mode ? "primary.light" : "primary.dark",
    },

    ".css-p8oq15-MuiInputBase-root-MuiInput-root:after": {
      borderColor: color,
    },

    "& input, & textarea": {
      color,
      pr: paddingRight,
    },
  };
};
