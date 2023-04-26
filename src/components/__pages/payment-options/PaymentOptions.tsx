import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { memo } from "react";
import Typography from "@mui/material/Typography";
import { createOrder, btnWrapperStyles } from "./u_paymentOptions";
import { PaystackButton } from "react-paystack";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { updateOrders } from "../../../store/features/user/user-slice";
import { useRouter } from "next/router";
import { resetCartList } from "../../../store/features/product/product-slice";
import {
  CartType,
  ProductType,
} from "../../../utils/ts-types/__store/typesProduct";

export default memo(function PaymentOptions({ price, cart, list }: PropType) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(({ user }) => user);

  const paymentSuccess = async () => {
    const order = createOrder(cart, list, price);

    dispatch(updateOrders(order));
    dispatch(resetCartList());

    await router.push("/payment-status");
  };

  const paymentError = async () => {
    await router.push("/payment-status");
  };

  const props = {
    email: userInfo.email || "test@gmail.com",
    amount: Math.round(price * 100),
    publicKey: "pk_test_17c88efeaeb964faa66cda7e2e09f018d1aa172d",
    text: "Pay With Paystack",
    onSuccess: () => paymentSuccess(),
    onFailure: () => paymentError(),
    onClose: () => paymentError(),
  };

  return (
    <>
      <Container maxWidth="xs" sx={{ py: { xs: 9, sm: 12, lg: 15 }, px: 2 }}>
        <Container sx={{ bgcolor: "primary.light", p: { xs: 3, md: 5 } }}>
          <Typography
            component="h4"
            variant="h5"
            color="secondary.main"
            textAlign="center"
          >
            Payment Options
          </Typography>
          <Box sx={{ my: 3 }}>
            <Box sx={btnWrapperStyles}>
              <PaystackButton className="pay-btn" {...props} />
            </Box>
            <Box sx={btnWrapperStyles}>
              <PaystackButton className="pay-btn" {...props} />
            </Box>
          </Box>
        </Container>
      </Container>
    </>
  );
});

type PropType = {
  price: number;
  cart: CartType[];
  list: ProductType[];
};
