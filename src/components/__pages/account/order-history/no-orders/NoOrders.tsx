import { memo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";

export default memo(function NoOrders() {
  return (
    <Box sx={{ minHeight: 300, display: "grid", placeItems: "center" }}>
      <Typography
        component="h6"
        variant="h6"
        sx={{ fontWeight: "400", textAlign: "center" }}
      >
        No Orders Found
      </Typography>
    </Box>
  );
});
