import { memo, useMemo } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Cart from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../../../../store/hooks";
import Link from "next/link";

export default memo(function UserMenu() {
  const { cartList } = useAppSelector((state) => state.product);

  const itemInCart = useMemo(() => {
    return cartList.reduce(
      (prev, next) => Number(next.quantity || 0) + prev,
      0
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(cartList)]);

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
      <Link
        style={{ color: "inherit", display: "block", lineHeight: 0 }}
        href="/cart"
      >
        <Cart />
        {!!itemInCart && (
          <Box
            component="span"
            sx={{
              position: "absolute",
              top: "-5%",
              right: "-50%",
              height: "20px",
              aspectRatio: "1/1",
              display: "grid",
              placeItems: "center",
              borderRadius: "100%",
              backgroundColor: "primary.main",
              color: "primary.dark",
              fontSize: ".7rem",
              fontWeight: "bold",
            }}
          >
            {itemInCart}
          </Box>
        )}
      </Link>
    </IconButton>
  );
});
