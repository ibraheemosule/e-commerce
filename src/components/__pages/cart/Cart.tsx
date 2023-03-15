import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { memo } from "react";
import Typography from "@mui/material/Typography";
import Btn from "../../others/btn/Btn";
import CartProductCard from "./cart-product-card/CartProductCard";
import { useAppSelector } from "../../../store/hooks";

const Cart = () => {
  const { cartList } = useAppSelector((state) => state.product);
  //  console.log(cartList);

  return (
    <>
      <Container sx={{ py: { xs: 9, sm: 12, lg: 15 } }}>
        <Container sx={{ bgcolor: "primary.light", pb: { xs: 6, md: 0 } }}>
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
                {cartList.map((prod) => (
                  <CartProductCard key={prod.id} id={prod.id} />
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              xs="auto"
              mx={{ md: "auto" }}
              ml={{ xs: "auto" }}
              mt={{ md: 6 }}
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
                  &#8358;20, 000
                </Typography>
              </Box>
              <Btn variant="contained" disableElevation>
                Checkout
              </Btn>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default memo(Cart);
