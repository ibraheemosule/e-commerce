import { memo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import OrderedProductCard from "../ordered-product-card/OrderedProductCard";
import { OrderType } from "../../../../../utils/ts-types/__store/typesUser";

export default memo(function OrderList({ order }: { order: OrderType }) {
  return (
    <Box>
      {order.pastPurchases?.map((product, i) => (
        <OrderedProductCard key={i} product={product} />
      ))}

      <Box sx={{ textAlign: "right" }}>
        <Typography>
          <span style={{ marginRight: 8 }}>Amount:</span>
          &#8358;{order.amount.toFixed(2)}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          Delivery fee excluded
        </Typography>
      </Box>
    </Box>
  );
});
