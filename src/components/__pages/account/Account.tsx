import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { memo } from "react";
import OrderHistory from "./order-history/OrderHistory";
import AccountDetails from "./account-details/AccountDetails";

export default memo(function Account() {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: { xs: 9, sm: 12, lg: 15 }, px: 1.5 }}>
        <Grid
          container
          rowGap={6}
          sx={{ justifyContent: { xs: "space-between", lg: "space-around" } }}
        >
          <AccountDetails />
          <OrderHistory />
        </Grid>
      </Container>
    </>
  );
});
