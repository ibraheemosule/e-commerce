import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { memo, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CheckoutAddress from "./checkout-address/CheckoutAddress";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { changeDeliveryDetails } from "../../../store/features/user/user-slice";
import { DeliveryDetailsType } from "../../../utils/ts-types/__store/typesUser";
import Btn from "../../others/btn/Btn";
import Router from "next/router";

export default memo(function Checkout() {
  const dispatch = useAppDispatch();
  const { totalPrice, cartList } = useAppSelector((state) => state.product);
  const { userInfo, deliveryDetails } = useAppSelector(({ user }) => user);
  const [addressOption, setAddressOption] = useState("default");

  useEffect(() => {
    if (addressOption === "default") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { email, ...rest } = userInfo;
      dispatch(changeDeliveryDetails(rest));
      return;
    }

    dispatch(changeDeliveryDetails({} as DeliveryDetailsType));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressOption]);

  async function toPaymentOptions() {
    const cart = JSON.stringify(cartList);
    await Router.push(
      {
        pathname: "/payment-options",
        query: {
          cartList: cart,
        },
      },
      "/payment-options"
    );
  }

  return (
    <>
      <Container maxWidth="md" sx={{ py: { xs: 9, sm: 12, lg: 15 }, px: 1.5 }}>
        <Container sx={{ bgcolor: "primary.light", p: 3, py: 8 }}>
          <Grid container>
            <Grid item xs={12}>
              <CheckoutAddress
                option={addressOption}
                setOption={setAddressOption}
              />
              {Object.values(deliveryDetails).join() && (
                <Container>
                  <Box
                    sx={{
                      display: "flex",
                      mt: { xs: 2 },
                    }}
                  >
                    <span style={{ alignSelf: "center", marginRight: 12 }}>
                      Shipping Fee:
                    </span>
                    <Typography color="primary.dark">&#8358;2, 000</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      rowGap: 1,
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    <strong style={{ alignSelf: "center", marginRight: 12 }}>
                      Subtotal:
                    </strong>
                    <Typography
                      component="h1"
                      variant="h6"
                      color="primary.dark"
                      sx={{ mr: 2 }}
                    >
                      &#8358;{totalPrice.toFixed(2)}
                    </Typography>
                    {/* <Link
                      href="/payment-options"
                      style={{
                        all: "unset",
                        display: "block",
                      }}
                    > */}
                    <Btn onClick={() => void toPaymentOptions()} size="small">
                      Proceed
                    </Btn>
                    {/* </Link> */}
                  </Box>
                </Container>
              )}
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
});
