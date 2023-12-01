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
  useEmailOtpMutation,
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
  const [loading, setLoading] = useState(false);
  const recaptcha = useReCaptcha();
  const [verifyOtp] = useVerifyOtpMutation();
  const [emailOtp] = useEmailOtpMutation();
  const [signup] = useSignupMutation();

  useEffect(() => setError(""), [otp]);

  const resendOtp = async () => {
    try {
      await emailOtp({ email: fields.email }).unwrap();
    } catch (e) {
      errorPopup(requestFailed(e));
      setError(requestFailed(e));
    }
  };

  const completeSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (otp.length !== 6 || !Number(otp)) throw Error("Invalid OTP");
      try {
        userFormValidation(fields);
      } catch {
        routeToOtpScreen(false);
        throw Error("Some sign up info failed validation");
      }

      setLoading(true);

      await recaptcha("verifyOtpFrom1907");
      await verifyOtp({ email: fields.email, otp }).unwrap();
      const { password, ...rest } = fields;
      delete rest.retypePassword;
      rest.phoneNo = formatPhoneNumber(Number(rest.phoneNo));

      await signup({ ...rest, password } as unknown as UserType & {
        password: string;
      }).unwrap();

      dispatch(updateUserInfo(rest as unknown as UserType));
      setLoading(false);
      successPopup("Sign up successful");
      Router.reload();
    } catch (e) {
      setLoading(false);
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
        <Typography
          component="p"
          sx={{
            fontSize: 16,
            mt: 2,
            mx: "auto",
            maxWidth: "50ch",
          }}
        >
          Input the OTP sent to your email to complete sign up.
        </Typography>
        <Container maxWidth="xs" sx={{ display: "block", mt: 4 }}>
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
              loading={loading}
            />
          </Box>
          <ButtonBase
            onClick={() => void resendOtp()}
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "secondary.main",
              my: 3,
            }}
          >
            Resend OTP
          </ButtonBase>
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
