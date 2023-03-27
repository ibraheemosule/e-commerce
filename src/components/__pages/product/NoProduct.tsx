import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Btn from "../../others/btn/Btn";
import Link from "next/link";
import LazyLoader from "../../others/lazy-loader/LazyLoader";
import { FC } from "react";
import { ProductType } from "../../../utils/ts-types/__store/typesProduct";

const NoProduct: FC<NoProductProps> = ({ product }) => {
  return (
    <Container maxWidth="md" sx={{ my: 12, p: 3 }}>
      <Grid
        container
        sx={{
          display: "grid",
          placeItems: "center",
          minHeight: 200,
          bgcolor: "primary.light",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{ display: "grid", placeItems: "center", width: "100%", m: 6 }}
        >
          {product ? <NoProductsFound /> : <LazyLoader />}
        </Grid>
      </Grid>
    </Container>
  );
};

const NoProductsFound = () => (
  <Box sx={{ textAlign: "center" }}>
    <Typography component="h4" variant="h5">
      Out of Stock
    </Typography>
    <Link href="/products" style={{ all: "unset" }}>
      <Btn sx={{ mt: 2 }}>View All Products</Btn>
    </Link>
  </Box>
);
interface NoProductProps {
  product: ProductType;
}
export default NoProduct;
