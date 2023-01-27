import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Navbar from "./navbar/Navbar";
import useScrollToTrigger from "@mui/material/useScrollTrigger";

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
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              MUI
            </Typography>
          </Toolbar>
          <Toolbar sx={{ display: trigger ? "block" : "none" }} />
        </AppBar>
      </Box>
      <Navbar offScreen={trigger} />
    </>
  );
}
