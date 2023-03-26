import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import { memo } from "react";
import Typography from "@mui/material/Typography";
import Details from "./profile/Profile";
import ChangePassword from "./change-password/ChangePassword";

export default memo(function AccountDetails() {
  return (
    <Grid
      item
      xs={12}
      md={5.5}
      sx={{
        bgcolor: "primary.light",
        p: { xs: 3, sm: 6 },
        maxHeight: { md: 600 },
        overflow: "auto",
      }}
    >
      <Typography component="h4" variant="h5" sx={{ color: "secondary.main" }}>
        Account Information
      </Typography>
      <Details />
      <Box sx={{ mt: 6 }}>
        <ChangePassword />
      </Box>
    </Grid>
  );
});
