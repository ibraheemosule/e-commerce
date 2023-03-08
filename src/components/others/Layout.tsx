import Box from "@mui/material/Box";
import { ReactElement } from "react";
import AppHeader from "./app-header/AppHeader";
import AppFooter from "./app-footer/AppFooter";
import dynamic from "next/dynamic";

interface ILayout {
  children: ReactElement;
}
function Layout({ children }: ILayout) {
  return (
    <Box
      className="layout"
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
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "primary.main" }}>
        {children}
      </Box>
      <Box component="footer">
        <AppFooter />
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
