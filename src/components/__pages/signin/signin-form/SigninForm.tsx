import Box from "@mui/material/Box";
import InputField from "../../../others/input-field/InputField";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { FC, FormEvent, memo, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FormBtn from "../../../others/btn/form-btn/FormBtn";
import {
  validateEmail,
  validatePassword,
} from "../../../../utils/utilsFunctions";
import { useAppDispatch } from "../../../../store/hooks";
import { updateUserInfo } from "../../../../store/features/user/user-slice";
import { UserType } from "../../../../utils/ts-types/__store/typesUser";
import Link from "next/link";

const SigninForm: FC<SigninFormProps> = ({ routeToPasswordPage }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateValue = (obj: { [key: string]: string }) => {
    if (obj["email"] !== undefined) setEmail(obj["email"]);
    if (obj["password"] !== undefined) setPassword(obj["password"]);
  };

  useEffect(() => setError(""), [email, password]);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!validateEmail(email)) throw Error("Invalid Email");

      if (validatePassword(password) !== "true") {
        throw Error("Incorrect Password");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch(updateUserInfo({ email } as UserType));
    } catch (e) {
      let message = "An error occurred";
      if (e instanceof Error) message = e.message;
      setError(message);
    } finally {
      setLoading(false);
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
          Sign in
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        textAlign="center"
        component="form"
        onSubmit={(e) => void submitForm(e)}
      >
        <Container maxWidth="xs">
          <Box>
            {["Email", "Password"].map((field) => (
              <InputField
                onChange={updateValue}
                key={field}
                value={field === "Email" ? email : password}
                name={field.toLowerCase()}
                type={field.toLowerCase()}
                placeholder={field}
              />
            ))}
          </Box>
          <Box sx={{ display: "block" }}>
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
            <FormBtn text="Log in" error={error} loading={loading} />
            <Box
              sx={{
                mx: "auto",
                fontSize: 18,
                mt: 6,
                color: "secondary.main",
                "&:hover": {
                  color: "secondary.dark",
                },
              }}
            >
              <Link href="/signup" style={{ all: "unset", cursor: "pointer" }}>
                Create an account
              </Link>
            </Box>
          </Box>
        </Container>
      </Grid>
    </>
  );
};

interface SigninFormProps {
  routeToPasswordPage: () => void;
}

export default memo(SigninForm);
