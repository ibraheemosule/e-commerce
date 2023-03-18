import Box from "@mui/material/Box";
import InputField from "../../../others/input-field/InputField";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { FC, memo, FormEvent, useState } from "react";
import Btn from "../../../others/btn/Btn";
import { validateEmail } from "../../../../utils/utilsFunctions";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ForgotPassword: FC<ForgotPasswordProps> = ({ routeToPasswordPage }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid Email Syntax");
      return;
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
        onSubmit={(e) => submitForm(e)}
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
        <Box sx={{ display: "block", position: "relative" }}>
          <Typography
            sx={{
              position: "absolute",
              textAlign: "center",
              width: "100%",
              top: 0,
              color: "secondary.dark",
              fontSize: 12,
            }}
          >
            {error}
          </Typography>
          <Btn
            type="submit"
            sx={{
              mt: 3,
              px: 6,
            }}
          >
            Submit
          </Btn>
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
