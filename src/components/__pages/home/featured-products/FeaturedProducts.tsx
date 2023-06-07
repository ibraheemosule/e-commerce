import ProductCard from "../../../others/product-card/ProductCard";
import Grid from "@mui/material/Grid";
import { useOneProductPerTag } from "../../../others/hooks/one-product-per-tag/useOneProductPerTag";

export default function FeaturedProducts() {
  const featuredProducts = useOneProductPerTag();

  return (
    <Grid container mx="auto" rowGap={9}>
      {featuredProducts.map((product, i) => (
        <Grid key={i} item xs={12} sm={4}>
          <ProductCard
            cart={false}
            path={product.tag}
            title={product.tag}
            img={product.images[0]}
          />
        </Grid>
      ))}
    </Grid>
  );
}
