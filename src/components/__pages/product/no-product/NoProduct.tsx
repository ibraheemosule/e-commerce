import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Btn from "../../../others/btn/Btn";
import Link from "next/link";
import LazyLoader from "../../../others/lazy-loader/LazyLoader";
import { FC } from "react";

const NoProduct: FC<NoProductProps> = ({ message }) => {
  return (
    <Container maxWidth="md" sx={{ py: 12 }}>
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
          {message === "loading" ? (
            <LazyLoader />
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography component="h4" variant="h5">
                {message}
              </Typography>
              <Link href="/products" style={{ all: "unset" }}>
                <Btn sx={{ mt: 2 }}>View All Products</Btn>
              </Link>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

interface NoProductProps {
  message: string;
}
export default NoProduct;
