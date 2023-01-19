import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar/Navbar";

export default function AppHeader() {
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
        </AppBar>
      </Box>
      <Navbar />
    </>
  );
}
