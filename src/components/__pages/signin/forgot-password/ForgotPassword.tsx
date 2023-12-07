import Box from "@mui/material/Box";
import InputField from "../../../others/input-field/InputField";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { FC, memo, FormEvent, useState, useEffect } from "react";
import { validateEmail } from "../../../../utils/utilsFunctions";
import FormBtn from "../../../others/btn/form-btn/FormBtn";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { errorPopup, successPopup } from "../../../../utils/utilsFunctions";
import { useResetPasswordMutation } from "../../../../store/features/new-user/new-user-slice";
import { responseError } from "../../../../utils/apiErrorResponse";
import Btn from "../../../others/btn/Btn";
import Image from "next/image";
import useReCaptcha from "../../../others/hooks/recaptcha/useRecaptcha";

const ForgotPassword: FC<ForgotPasswordProps> = ({ routeToPasswordPage }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPassword, { isSuccess }] = useResetPasswordMutation();
  const recaptcha = useReCaptcha();

  useEffect(() => setError(""), [email]);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!validateEmail(email)) throw Error("Invalid Email");

      await recaptcha("forgotPasswordFrom1907");

      const data = (await resetPassword({
        email,
      }).unwrap()) as unknown as { message: string };

      successPopup(data.message);
      setLoading(false);
    } catch (e) {
      let message = "An error occurred";
      if (responseError(e)) message = e.data.message;
      else if (e instanceof Error) message = e.message;
      errorPopup(message);
      setError(message);
      setLoading(false);
    }
  };

  const updateValue = (obj: { [key: string]: string }) => {
    setEmail(obj.email);
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
      <Grid
        item
        xs={12}
        textAlign="center"
        component="form"
        onSubmit={(e) => void submitForm(e)}
      >
        {isSuccess ? (
          <PasswordChangedSuccess routeToPasswordPage={routeToPasswordPage} />
        ) : (
          <>
            <Container maxWidth="xs" sx={{ display: "block" }}>
              <InputField
                onChange={updateValue}
                value={email}
                type="email"
                name="email"
                placeholder="Email"
              />
            </Container>
            <Box>
              <Box sx={{ justifyContent: "center" }}>
                <FormBtn
                  text="Reset Password"
                  error={error}
                  loading={loading}
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
                If the provided email exists, a new password will be sent to the
                email. You are advised to change this password once you are
                signed in.
              </Typography>
            </Box>
          </>
        )}
      </Grid>
    </>
  );
};

const PasswordChangedSuccess: FC<ForgotPasswordProps> = (prop) => {
  return (
    <Box>
      <Image
        src="/images/success.png"
        width={70}
        height={70}
        alt="success icon"
      />
      <Typography
        component="p"
        sx={{
          fontSize: 14,
          mx: "auto",
          maxWidth: "50ch",
        }}
      >
        A new password has been sent to the provided email. You are advised to
        change this password once you are signed in.
      </Typography>
      <Box sx={{ justifyContent: "center", mt: 3 }}>
        <Btn onClick={prop.routeToPasswordPage}>Sign in</Btn>
      </Box>
    </Box>
  );
};

interface ForgotPasswordProps {
  routeToPasswordPage: () => void;
}

export default memo(ForgotPassword);
