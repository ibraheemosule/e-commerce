import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  FC,
  memo,
  FormEvent,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { userFormValidation } from "../../../../utils/utilsFunctions";
import FormBtn from "../../../others/btn/form-btn/FormBtn";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {
  errorPopup,
  successPopup,
  formatPhoneNumber,
} from "../../../../utils/utilsFunctions";
import {
  useSignupMutation,
  useVerifyOtpMutation,
} from "../../../../store/features/new-user/new-user-slice";
import { requestFailed } from "../../../../utils/apiErrorResponse";
import useReCaptcha from "../../../others/hooks/recaptcha/useRecaptcha";

import { MuiOtpInput } from "mui-one-time-password-input";
import { UserType } from "../../../../utils/ts-types/__store/typesUser";
import { updateUserInfo } from "../../../../store/features/user/user-slice";
import { useAppDispatch } from "../../../../store/hooks";
import Router from "next/router";

const VerifyEmail: FC<IVerifyEmailProps> = ({ routeToOtpScreen, fields }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const recaptcha = useReCaptcha();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [signup, { isLoading: signupLoading }] = useSignupMutation();

  useEffect(() => setError(""), [otp]);

  const completeSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (otp.length !== 6 || !Number(otp)) throw Error("Invalid OTP");

      // try {
      //   userFormValidation(fields);
      // } catch {
      //   routeToOtpScreen(false);
      //   throw Error('Some sign up info failed validation');
      // }

      await recaptcha("verifyOtpFrom1907");
      await verifyOtp({ email: fields.email, otp }).unwrap();
      const { password, ...rest } = fields;
      delete rest.retypePassword;
      rest.phoneNo = formatPhoneNumber(Number(rest.phoneNo));

      return;

      await signup({ ...rest, password } as unknown as UserType & {
        password: string;
      }).unwrap();

      dispatch(updateUserInfo(rest as unknown as UserType));

      successPopup("Sign up successful");
      Router.reload();
    } catch (e) {
      errorPopup(requestFailed(e));
      setError(requestFailed(e));
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography
          component="h4"
          variant="h4"
          textAlign="center"
          color="secondary.main"
        >
          Email Verification
        </Typography>
        <ButtonBase
          onClick={() => routeToOtpScreen(false)}
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
      <Grid
        item
        xs={12}
        textAlign="center"
        component="form"
        onSubmit={(e) => void completeSignup(e)}
      >
        <Container maxWidth="xs" sx={{ display: "block" }}>
          <MuiOtpInput
            inputMode="numeric"
            length={6}
            value={otp}
            onChange={(val) => setOtp(val)}
          />
        </Container>
        <Box>
          <Box sx={{ justifyContent: "center", mt: 2 }}>
            <FormBtn
              text="Verify Email"
              btnSize="large"
              error={error}
              loading={isLoading || signupLoading}
            />
          </Box>
          <Typography
            component="p"
            sx={{
              fontSize: 14,
              mt: 3,
              mx: "auto",
              maxWidth: "50ch",
            }}
          >
            Provide the one-time OTP sent to the provided email for
            verification.
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export interface IVerifyEmailProps {
  routeToOtpScreen: Dispatch<SetStateAction<boolean>>;
  fields: { [key: string]: string };
}

export default memo(VerifyEmail);
