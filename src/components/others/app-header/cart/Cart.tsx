import { memo } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Cart from "@mui/icons-material/ShoppingCart";

export default memo(function UserMenu() {
  return (
    <IconButton
      sx={{
        color: "inherit",
        padding: 0,
        "&:hover": {
          opacity: 0.5,
        },
      }}
    >
      <Cart />
      <Box
        component="span"
        sx={{
          position: "absolute",
          top: "-5%",
          right: "-50%",
          padding: ".2rem",
          borderRadius: "100%",
          backgroundColor: "primary.main",
          color: "primary.dark",
          fontSize: ".6rem",
          fontWeight: "bold",
        }}
      >
        12
      </Box>
    </IconButton>
  );
});
