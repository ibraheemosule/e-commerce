import ProductCard from "../../../others/product-card/ProductCard";
import Grid from "@mui/material/Grid";
import { bags, shoes, belts } from "../../../../../testData";

export default function FeaturedProducts() {
  return (
    <Grid container mx="auto" bgcolor="primary.light">
      {[shoes[0], belts[0], bags[0]].map((product, i) => (
        <Grid key={i} item xs={12} sm={4}>
          <ProductCard
            cart={false}
            path="/products"
            title={product.tag}
            img={product.images[i]}
          />
        </Grid>
      ))}
    </Grid>
  );
}
