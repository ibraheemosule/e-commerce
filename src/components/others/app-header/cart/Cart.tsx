import { memo } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Cart from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../../../../store/hooks";

export default memo(function UserMenu() {
  const { cartItems } = useAppSelector((state) => state.user);

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
      {!!cartItems.length && (
        <Box
          component="span"
          sx={{
            position: "absolute",
            top: "-5%",
            right: "-50%",
            // py: ".3rem",
            height: "20px",
            aspectRatio: "1/1",
            display: "grid",
            placeItems: "center",
            // lineHeight: "0%",
            //height: "20px",
            borderRadius: "100%",
            backgroundColor: "primary.main",
            color: "primary.dark",
            fontSize: ".7rem",
            fontWeight: "bold",
          }}
        >
          {cartItems.length}
        </Box>
      )}
    </IconButton>
  );
});
