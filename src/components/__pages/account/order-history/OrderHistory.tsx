import Grid from "@mui/material/Grid";
import { memo } from "react";
import Typography from "@mui/material/Typography";

export default memo(function OrderHistory() {
  return (
    <Grid
      item
      xs={12}
      sm={5.5}
      sx={{ bgcolor: "primary.light", p: { xs: 3, lg: 6 } }}
    >
      <Typography component="h4" variant="h5" sx={{ color: "secondary.main" }}>
        Order History
      </Typography>
    </Grid>
  );
});
