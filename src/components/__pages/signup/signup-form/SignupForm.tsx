import InputField from "../../../others/input-field/InputField";
import Typography from "@mui/material/Typography";
import { memo, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {
  signupForm as form,
  signupFormFields as formFields,
} from "../u_signup";
import useFillForm from "../../../others/hooks/fill-form/useFillForm";
import FormBtn from "../../../others/form-btn/FormBtn";
import { validatePassword } from "../../../../utils/utilsFunctions";
import { submitSignupForm } from "./u_signupForm";

const LoginForm = () => {
  const [fields, setField] = useFillForm(formFields);
  const [error, setError] = useState("");
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
        onSubmit={(e) => submitSignupForm(e, setError, fields)}
        item
        xs={12}
        textAlign="center"
      >
        <Container maxWidth="sm">
          <Grid justifyContent="space-between" container>
            {Object.keys(formFields).map((field, i) => {
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

          <FormBtn text="create an account" error={error} />
        </Container>
      </Grid>
    </>
  );
};

export default memo(LoginForm);
