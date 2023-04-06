import Container from "@mui/material/Container";
import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { useAppSelector } from "../../../store/hooks";

const Success = dynamic(() => import("./success/Success"));
const Error = dynamic(() => import("./fail/Fail"));

const Payment = () => {
  const [paymentStatus] = useState("paid");
  const { cartList, immutableProducts } = useAppSelector(
    ({ product }) => product
  );

  // const createOrder = () => {
  //   return cartList.map(item => {
  //     const product = immutableProducts.find(
  //       prod => prod.id === item.productId
  //     );

  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { uid, ...rest } = item;

  //     return {
  //       ...rest,
  //       product,
  //       createdAt: new Date().toISOString(),
  //     };
  //   });
  // };

  return (
    <>
      <Container maxWidth="md" sx={{ py: { xs: 9, sm: 12, lg: 15 }, px: 2 }}>
        <Container sx={{ bgcolor: "primary.light", p: 3, py: 8 }}>
          {paymentStatus === "paid" ? <Success /> : <Error />}
        </Container>
      </Container>
    </>
  );
};

export default memo(Payment);
