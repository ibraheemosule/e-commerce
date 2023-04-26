import { memo } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Success = () => {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          color: "primary.dark",
        }}
      >
        <Image
          src="/images/success.png"
          width={100}
          height={100}
          alt="success icon"
        />
        <Typography component="h5" variant="h5">
          Payment successful
        </Typography>
        <Typography mt={1}>
          <strong>Thank you for your patronage!</strong>
        </Typography>
        <Typography mt={1}>
          The transaction receipt has been sent to your mail
        </Typography>
      </Box>
    </>
  );
};

export default memo(Success);
