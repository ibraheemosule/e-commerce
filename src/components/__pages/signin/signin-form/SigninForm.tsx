import Box from "@mui/material/Box";
import InputField from "../../../others/input-field/InputField";
import Typography from "@mui/material/Typography";

import ButtonBase from "@mui/material/ButtonBase";
import { FC, FormEvent, memo, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Btn from "../../../others/btn/Btn";
import {
  validateEmail,
  validatePassword,
} from "../../../../utils/utilsFunctions";

const SigninForm: FC<LoginFormProps> = ({ routeToPasswordPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const updateValue = (obj: { [key: string]: string }) => {
    if (obj["email"] !== undefined) setEmail(obj["email"]);
    if (obj["password"] !== undefined) setPassword(obj["password"]);
  };

  useEffect(() => setError(""), [email, password]);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid Email Syntax");
      return;
    }

    if (validatePassword(password) !== "true") {
      setError("Incorrect Password");
      return;
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
          Login
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        textAlign="center"
        component="form"
        onSubmit={(e) => submitForm(e)}
      >
        <Container maxWidth="xs">
          <Box>
            <InputField
              onChange={updateValue}
              value={email}
              name="email"
              type="email"
              placeholder="Email"
            />
          </Box>
          <Box sx={{ display: "block", mt: 2 }}>
            <InputField
              onChange={updateValue}
              value={password}
              name="password"
              placeholder="Password"
              type="password"
            />

            <ButtonBase onClick={routeToPasswordPage}>
              <Typography
                component="p"
                sx={{
                  fontSize: 16,
                  color: "secondary.main",
                  "&:hover": {
                    color: "secondary.dark",
                  },
                }}
              >
                Forgot password?
              </Typography>
            </ButtonBase>
          </Box>
          <Box sx={{ display: "block", position: "relative" }}>
            <Btn
              sx={{
                mt: 3,
                px: 6,
              }}
              type="submit"
            >
              Submit
            </Btn>
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
            <ButtonBase
              sx={{
                display: "flex",
                mx: "auto",
                fontSize: 18,
                mt: 6,
                color: "secondary.main",
                "&:hover": {
                  color: "secondary.dark",
                },
              }}
              onClick={routeToPasswordPage}
            >
              Create an account
            </ButtonBase>
          </Box>
        </Container>
      </Grid>
    </>
  );
};

interface LoginFormProps {
  routeToPasswordPage: () => void;
}

export default memo(SigninForm);
