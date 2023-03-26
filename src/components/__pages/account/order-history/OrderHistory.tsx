import Grid from "@mui/material/Grid";
import { memo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import NoOrders from "./no-orders/NoOrders";
import OrderedProductCard from "./ordered-product-card/OrderedProductCard";
import { useAppSelector } from "../../../../store/hooks";

export default memo(function OrderHistory() {
  const { orders } = useAppSelector(({ user }) => user);
  const { totalPrice } = useAppSelector(({ product }) => product);

  return (
    <Grid
      item
      xs={12}
      md={5.5}
      sx={{
        bgcolor: "primary.light",
        p: { xs: 3, sm: 6 },
        maxHeight: 600,
        overflow: "auto",
      }}
    >
      <Typography component="h4" variant="h5" sx={{ color: "secondary.main" }}>
        Order History
      </Typography>
      {orders.length ? (
        <Box>
          {orders.map((order) => {
            console.log(order);
            return order.pastPurchases?.map((product, i) => {
              console.log(product, "hrke");
              return <OrderedProductCard key={i} product={product} />;
            });
          })}
          <Box sx={{ textAlign: "right" }}>
            <Typography
              component="h1"
              variant="h6"
              color="primary.dark"
              sx={{ mr: 2 }}
            >
              <span style={{ marginRight: 12 }}>Amount:</span>
              &#8358;{totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ minHeight: 300, display: "grid", placeItems: "center" }}>
          <NoOrders />
        </Box>
      )}
    </Grid>
  );
});
