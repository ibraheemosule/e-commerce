import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ProductCard from "../../others/product-card/ProductCard";
import { productsList } from "./u_products";

import { memo } from "react";

import Grid from "@mui/material/Grid";

const Products = () => {
  return (
    <>
      <Box bgcolor="primary.main" py={{ xs: 9, sm: 12, lg: 15 }}>
        <Container>
          <Grid container maxWidth="lg" bgcolor="primary.light" py={6}>
            <Grid item xs={12}>
              <Container></Container>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center" gap={5}>
                {productsList.map((product, i) => (
                  <Grid item xs={10} sm={5} md={3.5} key={i}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default memo(Products);
