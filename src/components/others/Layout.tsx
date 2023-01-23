import Box from "@mui/material/Box";
import { ReactElement } from "react";
import AppHeader from "./app-header/AppHeader";
import AppFooter from "./app-footer/AppFooter";

interface ILayout {
  children: ReactElement;
}

export default function Layout({ children }: ILayout) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        component="header"
        sx={{
          boxShadow: 2,
        }}
      >
        <AppHeader />
      </Box>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Box component="footer">
        <AppFooter />
      </Box>
    </Box>
  );
}
