import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ProductCard from "../../others/product-card/ProductCard";
import { productsList } from "./u_products";
import SelectField from "../../others/select-field/SelectField";
import SearchBar from "../../others/search-bar/SearchBar";

import { memo } from "react";

import Grid from "@mui/material/Grid";

const Products = () => {
  return (
    <>
      <Box bgcolor="primary.main" py={{ xs: 9, sm: 12, lg: 15 }}>
        <Container>
          <Grid container maxWidth="lg" bgcolor="primary.light" py={6}>
            <Grid item xs={12}>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  rowGap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    alignSelf: "flex-end",
                    justifySelf: "flex-start",

                    "& > div": {
                      bgcolor: "primary.main",
                      "&:hover": {
                        bgcolor: "primary.main",
                      },
                    },
                  }}
                >
                  <SearchBar />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    width: { xs: "100%", sm: "auto" },
                    flexWrap: "wrap",
                    justifyContent: { sm: "space-between" },
                  }}
                >
                  <SelectField />
                  <SelectField />
                </Box>
              </Container>
            </Grid>
            <Grid item xs={12} mt={3}>
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
