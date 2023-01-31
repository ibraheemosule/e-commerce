import Box from "@mui/material/Box";
import InputField from "../../../others/input-field/InputField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { FC, memo } from "react";

import Grid from "@mui/material/Grid";

const ForgotPassword: FC<ForgotPasswordProps> = ({ routeToPasswordPage }) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography
          component="h4"
          variant="h4"
          textAlign="center"
          color="secondary.main"
        >
          Reset Password
        </Typography>
        <ButtonBase
          onClick={routeToPasswordPage}
          sx={{
            position: "absolute",
            top: "2%",
            right: "2%",
            color: "secondary.main",

            "&:hover": {
              color: "secondary.dark",
            },
          }}
        >
          <CancelOutlinedIcon />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Box sx={{ display: "block", mt: 3 }}>
          <InputField placeholder="Email" />
        </Box>
        <Box sx={{ display: "block" }}>
          <Button
            sx={{
              bgcolor: "secondary.main",
              color: "primary.dark",
              mt: 3,
              px: 6,
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            Submit
          </Button>
          <Typography
            component="p"
            sx={{
              fontSize: 14,
              mt: 3,
              mx: "auto",
              maxWidth: "30ch",
            }}
          >
            A new password will be sent to your email to login. You are advised
            to change this password after logging in
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

interface ForgotPasswordProps {
  routeToPasswordPage: () => void;
}

export default memo(ForgotPassword);
