import Container from "@mui/material/Container";
import { memo, useState } from "react";
import dynamic from "next/dynamic";

const Success = dynamic(() => import("./success/Success"));
const Error = dynamic(() => import("./failed/Failed"));

const Payment = () => {
  const [paymentStatus] = useState("paid");
  return (
    <>
      <Container maxWidth="md" sx={{ py: { xs: 9, sm: 12, lg: 15 } }}>
        <Container sx={{ bgcolor: "primary.light", p: 3, py: 8 }}>
          {paymentStatus === "paid" ? <Success /> : <Error />}
        </Container>
      </Container>
    </>
  );
};

export default memo(Payment);
