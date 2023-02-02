import { incremented } from "../../../store/features/counter/counter-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Hero from "./hero/Hero";
import { memo } from "react";
import FeaturedProducts from "./featured-products/FeaturedProducts";
import TrendingBrands from "./trending-brands/TrendingBrands";
import Grid from "@mui/material/Grid";
import About from "./about/About";
import Faq from "./faq/Faq";

const Home = () => {
  const counter = useAppSelector((state) => state.counter.value),
    dispatch = useAppDispatch();

  return (
    <>
      <Hero />
      <Box bgcolor="primary.main" py={{ xs: 9, sm: 12, lg: 15 }}>
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
              <Faq />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default memo(Home);
