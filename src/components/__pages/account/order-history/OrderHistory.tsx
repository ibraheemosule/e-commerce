import Grid from "@mui/material/Grid";
import { memo, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import NoOrders from "./no-orders/NoOrders";
import { useAppSelector } from "../../../../store/hooks";
import Accordion from "../../../others/accordion/Accordion";
import OrderList from "./order-list/OrderList";
import { convertDate } from "../../../../utils/utilsFunctions";
import { useGetOrderQuery } from "../../../../store/features/new-user/new-user-slice";

export default memo(function OrderHistory() {
  const { userInfo } = useAppSelector(({ user }) => user);
  const [expanded, setExpanded] = useState<number | false>(false);
  const { data, isError } = useGetOrderQuery({
    email: userInfo.email,
  });

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
      {!data ? (
        isError ? (
          <NoOrders text={"Could not load orders"} />
        ) : (
          <NoOrders text="loading" />
        )
      ) : data.data.length ? (
        <Box sx={{ mt: 2 }}>
          {data.data.map((order, i) => (
            <Accordion
              title={
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      sx={{ mr: 1, color: "secondary.dark", fontSize: 13 }}
                    >
                      Ordered on:
                    </Typography>
                    <Typography sx={{ fontSize: 13 }}>
                      {convertDate(new Date(order.time))}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      sx={{ mr: 1, color: "secondary.dark", fontSize: 13 }}
                    >
                      To:
                    </Typography>
                    <Typography
                      sx={{ fontSize: 13 }}
                    >{`${order.deliveryDetails.firstName} ${order.deliveryDetails.lastName}`}</Typography>
                  </Box>
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
          <NoOrders text="no orders yet" />
        </Box>
      )}
    </Grid>
  );
});
