import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Hero from "./hero/Hero";
import { memo } from "react";
import FeaturedProducts from "./featured-products/FeaturedProducts";
import TrendingBrands from "./trending-brands/TrendingBrands";
import Grid from "@mui/material/Grid";
import About from "./about/About";
import WhyUs from "./why-us/WhyUs";

const Home = () => {
  return (
    <>
      <Hero />
      <Box py={{ xs: 9, sm: 12, lg: 15 }} px={2}>
        <Container>
          <Grid
            container
            maxWidth="lg"
            mx="auto"
            rowGap={{ xs: 9, sm: 12, lg: 15 }}
          >
            <Grid item xs={12}>
              <FeaturedProducts />
            </Grid>
            <Grid item xs={12}>
              <TrendingBrands />
            </Grid>
            <Grid item xs={12}>
              <About />
            </Grid>
            <Grid item xs={12}>
              <WhyUs />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default memo(Home);
