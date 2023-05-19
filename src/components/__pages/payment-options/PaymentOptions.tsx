import Container from "@mui/material/Container";
import Box from "@mui/system/Box";
import { memo, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { createOrder, btnWrapperStyles } from "./u_paymentOptions";
import { PaystackButton } from "react-paystack";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { updateOrders } from "../../../store/features/user/user-slice";
import Router from "next/router";
import { resetCartList } from "../../../store/features/product/product-slice";
import {
  CartType,
  ProductType,
} from "../../../utils/ts-types/__store/typesProduct";
import { usePostOrderMutation } from "../../../store/features/new-user/new-user-slice";
import { successPopup, errorPopup } from "../../../utils/utilsFunctions";
import { requestFailed } from "../../../utils/apiErrorResponse";

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY as string;

export default memo(function PaymentOptions({ amount, cart, list }: PropType) {
  const dispatch = useAppDispatch();
  const { userInfo, deliveryDetails } = useAppSelector(({ user }) => user);
  const [postOrder] = usePostOrderMutation();

  useEffect(() => {
    const reload = setTimeout(() => Router.reload(), 1000 * 500);
    return () => clearInterval(reload);
  }, []);

  const paymentSuccess = async () => {
    const order = createOrder(
      cart,
      list,
      amount,
      userInfo.email,
      deliveryDetails
    );

    try {
      await postOrder(order).unwrap();

      successPopup("Payment successful");

      dispatch(updateOrders(order));
      dispatch(resetCartList());

      await Router.push("/payment-status");
    } catch (e) {
      errorPopup(requestFailed(e));
    }
  };

  const paymentError = async (message?: string) => {
    if (message) {
      errorPopup(message);
    } else {
      errorPopup("Unable to confirm");
    }

    await Router.push("/payment-status");
  };

  const props = {
    email: userInfo.email,
    amount: Math.round(amount * 100),
    publicKey: PAYSTACK_KEY,
    text: "Pay With Paystack",
    onSuccess: () => paymentSuccess(),
    onFailure: () => paymentError(),
    onClose: () => paymentError("Payment process not completed"),
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
            {/* <Box sx={btnWrapperStyles}>
              <PaystackButton className="pay-btn" {...props} />
            </Box> */}
          </Box>
        </Container>
      </Container>
    </>
  );
});

type PropType = {
  amount: number;
  cart: CartType[];
  list: ProductType[];
};
