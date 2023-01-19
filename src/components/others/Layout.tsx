import Box from "@mui/material/Box";
import { ReactElement } from "react";
import AppHeader from "./AppHeader/AppHeader";

interface ILayout {
  children: ReactElement;
}

export default function Layout({ children }: ILayout) {
  return (
    <Box>
      <Box
        component="header"
        sx={{
          boxShadow: 2,
        }}
      >
        <AppHeader />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
