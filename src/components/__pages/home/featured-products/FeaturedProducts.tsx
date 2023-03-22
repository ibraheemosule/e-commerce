import ProductCard from "../../../others/product-card/ProductCard";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "../../../../store/hooks";
import { useMemo } from "react";
import { ProductType } from "../../../../utils/ts-types/data-types";
import { tags } from "../../../../utils/utilsData";

export default function FeaturedProducts() {
  const { immutableProducts } = useAppSelector(({ product }) => product);

  const featuredProducts = useMemo(() => {
    const products = [] as ProductType[];
    tags.forEach((tag) => {
      const product = immutableProducts.find((prod) => prod.tag === tag);
      if (product) {
        products.push(product);
      }
    });
    return products;
  }, [immutableProducts]);

  return (
    <Grid container mx="auto" rowGap={9}>
      {featuredProducts.map((product, i) => (
        <Grid key={i} item xs={12} sm={4}>
          <ProductCard
            cart={false}
            path={product.tag}
            title={product.tag}
            img={product.images[i]}
          />
        </Grid>
      ))}
    </Grid>
  );
}
