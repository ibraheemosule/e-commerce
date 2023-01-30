import ProductCard from "../../../others/product-card/ProductCard";
import Grid from "@mui/material/Grid";

const products = [
  {
    url: "/images/shoe.jpg",
    title: "Shoes",
  },
  {
    url: "/images/belts.jpg",
    title: "Belts",
  },
  {
    url: "/images/purse.jpg",
    title: "Purses",
  },
];

export default function FeaturedProducts() {
  return (
    <Grid container mx="auto" bgcolor="primary.light">
      {products.map((product, i) => (
        <Grid key={i} item xs={12} sm={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
