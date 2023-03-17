import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { Children, memo } from "react";
import Typography from "@mui/material/Typography";
import Btn from "../../others/btn/Btn";
import CartProductCard from "./cart-product-card/CartProductCard";
import { useAppSelector } from "../../../store/hooks";
import Link from "next/link";

const Cart = () => {
  const { cartList, totalPrice } = useAppSelector((state) => state.product);

  return (
    <>
      <Container sx={{ py: { xs: 9, sm: 12, lg: 15 } }}>
        <Container sx={{ bgcolor: "primary.light", pb: { xs: 6, md: 0 } }}>
          {cartList.length ? (
            <Grid container>
              <Grid
                item
                xs={12}
                md={8.5}
                sx={{
                  border: 0,
                  borderRightWidth: { md: 1 },
                  borderStyle: "solid",
                  borderColor: "primary.main",
                  pr: 2,
                  pb: 6,
                  maxHeight: "500px",
                  overflow: "scroll",
                }}
              >
                <Grid container>
                  {Children.toArray(
                    cartList.map((prod) => <CartProductCard id={prod.id} />)
                  )}
                </Grid>
              </Grid>
              <Grid
                item
                xs="auto"
                mx={{ md: "auto" }}
                ml={{ xs: "auto" }}
                my={4}
                alignSelf="self-end"
              >
                <Box
                  sx={{
                    display: "flex",
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  <strong style={{ alignSelf: "center", marginRight: 12 }}>
                    Subtotal:
                  </strong>{" "}
                  <Typography component="h1" variant="h5" color="primary.dark">
                    &#8358;{totalPrice.toFixed(2).toLocaleString()}
                  </Typography>
                </Box>
                <Btn sx={{ mt: 1 }} variant="contained" disableElevation>
                  Checkout
                </Btn>
              </Grid>
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sx={{ display: "grid", placeItems: "center", minHeight: 200 }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ mb: 2 }} component="h4" variant="h5">
                  Cart List is Empty
                </Typography>
                <Link href="/products" style={{ all: "unset" }}>
                  <Btn>Start Shopping</Btn>
                </Link>
              </Box>
            </Grid>
          )}
        </Container>
      </Container>
    </>
  );
};

export default memo(Cart);
