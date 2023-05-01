import Box from "@mui/material/Box";
import InputField from "../../../others/input-field/InputField";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { FC, memo, FormEvent, useState } from "react";
import { validateEmail } from "../../../../utils/utilsFunctions";
import FormBtn from "../../../others/btn/form-btn/FormBtn";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ForgotPassword: FC<ForgotPasswordProps> = ({ routeToPasswordPage }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!validateEmail(email)) throw Error("Invalid Email");

      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (e) {
      let message = "An error occurred";
      if (e instanceof Error) message = e.message;
      setError(message);
    } finally {
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
            <FormBtn text="Reset Password" error={error} loading={loading} />
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
