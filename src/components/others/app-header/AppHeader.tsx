import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./navbar/Navbar";
import useScrollToTrigger from "@mui/material/useScrollTrigger";
import Image from "next/image";

export default function AppHeader() {
  const trigger = useScrollToTrigger({
    threshold: 150,
    disableHysteresis: true,
  });

  return (
    <>
      <Box>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: "primary.dark",
            color: "primary.light",
            pt: ".5rem",
            borderBottom: "1px solid #80808038",
          }}
        >
          <Toolbar>
            <Image src="/images/logo.png" alt="logo" width={100} height={25} />
          </Toolbar>
          <Toolbar sx={{ display: trigger ? "block" : "none" }} />
        </AppBar>
      </Box>
      <Navbar offScreen={trigger} />
    </>
  );
}
