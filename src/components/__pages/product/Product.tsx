import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { memo } from "react";
import dynamic from "next/dynamic";
import { ProductType } from "../../../utils/ts-types/__store/typesProduct";
import { useRouter } from "next/router";

const ProductDetails = dynamic(
  () => import("./product-details/ProductDetails")
);
const NoProduct = dynamic(() => import("./no-product/NoProduct"));

export default memo(function Product({ product, message }: PropType) {
  const router = useRouter();

  if (router.isFallback) {
    return <NoProduct message="loading" />;
  }

  if (message) {
    return <NoProduct message={message} />;
  }

  return (
    <Container sx={{ py: { xs: 9, sm: 12, lg: 15 }, px: 2 }}>
      <Grid
        container
        maxWidth="lg"
        sx={{ bgcolor: "primary.light", rowGap: 2, py: 6, px: 3 }}
      >
        <ProductDetails product={product} />
      </Grid>
    </Container>
  );
});

type PropType = {
  product: ProductType;
  message?: string;
};
