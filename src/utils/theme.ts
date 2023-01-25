import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const primaryMain = "#e5e5e5",
  primaryDark = "#14213d",
  secondaryMain = "#fca311";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: "#fff",
      main: primaryMain,
      dark: primaryDark,
      contrastText: "#000",
    },
    secondary: {
      main: secondaryMain,
      contrastText: "#14213d",
    },

    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
