import InputField from "../../../others/input-field/InputField";
import Typography from "@mui/material/Typography";
import { memo, useState, useEffect, FormEvent } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { signupForm as form, signupFormFields } from "../u_signup";
import useFillForm from "../../../others/hooks/fill-form/useFillForm";
import FormBtn from "../../../others/btn/form-btn/FormBtn";
import { validatePassword } from "../../../../utils/utilsFunctions";
import { submitSignupForm } from "./u_signupForm";
import { useAppDispatch } from "../../../../store/hooks";
import { updateUserInfo } from "../../../../store/features/user/user-slice";
import { UserType } from "../../../../utils/ts-types/__store/typesUser";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [fields, setField] = useFillForm(signupFormFields);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordGuide, setPasswordGuide] = useState("");

  useEffect(() => {
    if (validatePassword(fields.password) === "true") {
      setPasswordGuide("");
      return;
    }
    setPasswordGuide("must contain " + validatePassword(fields.password));
  }, [fields.password]);

  useEffect(() => setError(""), [fields]);

  const updateField = (value: { [key: string]: string }) => {
    setField({ payload: value });
  };

  const createAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      //console.log(!!submitSignupForm(fields));
      submitSignupForm(fields);
      await new Promise((resolve) => setTimeout(resolve, 500));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, retypePassword, ...rest } = fields;
      dispatch(updateUserInfo(rest as unknown as UserType));
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
          Create An Account
        </Typography>
      </Grid>
      <Grid
        component="form"
        onSubmit={(e) => void createAccount(e)}
        item
        xs={12}
        textAlign="center"
      >
        <Container maxWidth="sm">
          <Grid justifyContent="space-between" container>
            {Object.keys(signupFormFields).map((field, i) => {
              const value = field as keyof typeof form;
              return (
                <Grid
                  key={i}
                  item
                  sx={{
                    position: "relative",
                  }}
                  {...form[value].gridProps}
                >
                  <InputField
                    placeholder={form[value].placeholder}
                    value={fields[field]}
                    onChange={updateField}
                    name={field}
                    type={
                      value.toLowerCase().includes("password")
                        ? "password"
                        : "text"
                    }
                  />
                  {value.toLowerCase() === "password" && fields.password && (
                    <Typography
                      sx={{
                        position: "absolute",
                        textAlign: "center",
                        width: "100%",
                        top: "82%",
                        color: "secondary.dark",
                        fontSize: 12,
                        textTransform: "capitalize",
                      }}
                    >
                      {passwordGuide}
                    </Typography>
                  )}
                </Grid>
              );
            })}
          </Grid>

          <FormBtn text="create an account" error={error} loading={loading} />
        </Container>
      </Grid>
    </>
  );
};

export default memo(LoginForm);
