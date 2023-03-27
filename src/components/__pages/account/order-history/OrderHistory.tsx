import Grid from "@mui/material/Grid";
import { memo, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import NoOrders from "./no-orders/NoOrders";
import { useAppSelector } from "../../../../store/hooks";
import Accordion from "../../../others/accordion/Accordion";
import OrderList from "./order-list/OrderList";
import { convertDate } from "../../../../utils/utilsFunctions";

export default memo(function OrderHistory() {
  const { orders } = useAppSelector(({ user }) => user);
  const [expanded, setExpanded] = useState<number | false>(false);

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
        <Box sx={{ mt: 2 }}>
          {orders.map((order, i) => (
            <Accordion
              title={
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ mr: 2, color: "secondary.dark" }}>
                    Ordered on:
                  </Typography>
                  <Typography>
                    {convertDate(new Date(order.createdAt))}
                  </Typography>
                </Box>
              }
              key={i}
              expanded={expanded}
              setExpanded={setExpanded}
              id={i}
            >
              <OrderList order={order} />
            </Accordion>
          ))}
        </Box>
      ) : (
        <Box sx={{ minHeight: 300, display: "grid", placeItems: "center" }}>
          <NoOrders />
        </Box>
      )}
    </Grid>
  );
});
