import Box from "@mui/material/Box";
import { ReactElement } from "react";
import AppHeader from "./app-header/AppHeader";
import AppFooter from "./app-footer/AppFooter";
import dynamic from "next/dynamic";
import useFade from "./hooks/fade-transition/useFade";
import { useRouter } from "next/router";
import { animated } from "@react-spring/web";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={2000}
        draggable={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme="colored"
        style={{
          maxWidth: 250,
          padding: 0,
          textTransform: "capitalize",
          fontSize: 13,
        }}
      />
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
