import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { FC, memo, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { btnClasses } from "../../others/btn/Btn";
import CheckoutAddress from "./checkout-address/CheckoutAddress";
import { PaystackButton } from "react-paystack";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { changeDeliveryAddress } from "../../../store/features/user/user-slice";

const Checkout: FC = () => {
  const dispatch = useAppDispatch();
  const { totalPrice } = useAppSelector((state) => state.product);
  const { deliveryAddress, user } = useAppSelector(({ user }) => user);
  const [addressOption, setAddressOption] = useState("default");

  useEffect(() => {
    if (addressOption === "default") {
      const address = `${user.address}, ${user.city}, ${user.state}`;
      dispatch(changeDeliveryAddress(address));
      return;
    }
    dispatch(changeDeliveryAddress(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressOption]);

  const props = {
    email: "sulayibraheem@gmail.com",
    amount: 500 * 100,
    publicKey: "pk_test_17c88efeaeb964faa66cda7e2e09f018d1aa172d",
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => confirm("Are you sure?"),
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: { xs: 9, sm: 12, lg: 15 } }}>
        <Container sx={{ bgcolor: "primary.light", p: 3, py: 8 }}>
          <Grid container>
            <Grid item xs={12}>
              <CheckoutAddress
                option={addressOption}
                setOption={setAddressOption}
              />
              {deliveryAddress && (
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
                      ".MuiButton-root": {
                        padding: ".5rem 2rem",
                        border: 0,
                        outline: 0,
                        borderRadius: "5px",
                        fontWeight: 500,
                        fontSize: "1rem",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <strong style={{ alignSelf: "center", marginRight: 12 }}>
                      Subtotal:
                    </strong>
                    <Typography
                      component="h1"
                      variant="h5"
                      color="primary.dark"
                      sx={{ mr: 2 }}
                    >
                      &#8358;{totalPrice}
                    </Typography>

                    <PaystackButton className={btnClasses} {...props} />
                  </Box>
                </Container>
              )}
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default memo(Checkout);
