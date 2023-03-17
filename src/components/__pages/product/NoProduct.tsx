import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Btn from "../../others/btn/Btn";
import Link from "next/link";

const NoProduct = () => (
  <Container maxWidth="md" sx={{ bgcolor: "primary.light" }}>
    <Grid
      container
      sx={{ display: "grid", placeItems: "center", minHeight: 200 }}
    >
      <Grid item xs={12} sx={{ display: "grid", placeItems: "center" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography component="h4" variant="h5">
            No Products Found
          </Typography>
          <Link href="/products" style={{ all: "unset" }}>
            <Btn sx={{ mt: 2 }}>View All Products</Btn>
          </Link>
        </Box>
      </Grid>
    </Grid>
  </Container>
);

export default NoProduct;
