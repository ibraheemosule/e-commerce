import Box from "@mui/material/Box";
import { ReactElement } from "react";
import AppHeader from "./app-header/AppHeader";
import AppFooter from "./app-footer/AppFooter";
import dynamic from "next/dynamic";
import useFade from "./hooks/fade-transition/useFade";
import { useRouter } from "next/router";
import { animated } from "@react-spring/web";
interface ILayout {
  children: ReactElement;
}

function Layout({ children }: ILayout) {
  const path = useRouter().pathname;
  const fade = useFade<string>(path);
  return (
    <Box
      className="layout"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "primary.dark",
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
      {fade((props, item) => (
        <animated.div key={item} style={{ flexGrow: 1, ...props }}>
          <Box component="main" sx={{ bgcolor: "primary.main" }}>
            {children}
          </Box>
        </animated.div>
      ))}

      <Box component="footer">
        <AppFooter />
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
