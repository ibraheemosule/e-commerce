import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { memo } from "react";
import Typography from "@mui/material/Typography";
import Btn from "../../others/btn/Btn";
import CartProductCard from "./cart-product-card/CartProductCard";

const Cart = () => {
  return (
    <>
      <Container sx={{ py: { xs: 9, sm: 12, lg: 15 } }}>
        <Container sx={{ bgcolor: "primary.light", pb: { xs: 6, md: 0 } }}>
          <Grid container>
            <CartProductCard />
            <Grid
              item
              xs={12}
              sm={4}
              md="auto"
              mx={{ md: "auto" }}
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
