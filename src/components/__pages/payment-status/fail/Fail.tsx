import { memo } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Btn from "../../../others/btn/Btn";
import ButtonBase from "@mui/material/ButtonBase";
import { useAppSelector } from "../../../../store/hooks";
import Router from "next/router";

const Fail = () => {
  const { cartList } = useAppSelector(({ product }) => product);

  Router;
  async function toPaymentOptions() {
    await Router.push(
      {
        pathname: "/payment-options",
        query: {
          cartList: JSON.stringify(cartList),
        },
      },
      "/payment-options"
    );
  }
  return (
    <Box
      sx={{
        textAlign: "center",
        color: "primary.dark",
      }}
    >
      <Image
        src="/images/error.png"
        width={100}
        height={100}
        alt="success icon"
      />
      <Typography component="h5" variant="h5">
        Could not confirm payment
      </Typography>

      <Btn onClick={() => void toPaymentOptions()} sx={{ mt: 2 }}>
        Retry Payment
      </Btn>

      <ButtonBase
        sx={{
          display: "block",
          mt: 2,
          mx: "auto",
          fontSize: 14,
          color: "secondary.main",

          "&:hover": {
            color: "secondary.dark",
          },
        }}
      >
        If this was an error, Contact support
      </ButtonBase>
    </Box>
  );
};

export default memo(Fail);
