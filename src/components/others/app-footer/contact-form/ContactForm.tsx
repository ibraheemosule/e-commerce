import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputField from "../../input-field/InputField";
import Btn from "../../btn/Btn";
import useFillForm from "../../hooks/fill-form/useFillForm";
import { FormEvent, memo, useEffect, useState } from "react";
import { contactFormField } from "./u_contactForm";
import { onlyAlphabet, validateEmail } from "../../../../utils/utilsFunctions";
import emailjs from "@emailjs/browser";
import LoaderIcon from "../../LoaderIcon";

const formField = {
  fullName: "",
  email: "",
  message: "",
  error: "",
};

const ContactForm = () => {
  const [form, dispatch] = useFillForm(formField);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dependency = JSON.stringify(form);

  useEffect(() => dispatch({ payload: { error: "" } }), [dependency, dispatch]);

  const updateForm = (inputValue: { [key: string]: string }) => {
    dispatch({ payload: inputValue });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fullName, email, message } = form;
    void (async () => {
      setLoading(true);
      try {
        const checkForScripts = Object.values(form).join("").includes("<");
        if (checkForScripts) throw new Error(`Character '<' not allowed`);

        if (!onlyAlphabet(form.fullName))
          throw new Error("Invalid character(s) in name field");

        if (!fullName.trim() || !email.trim() || !message.trim())
          throw new Error("Some fields are empty");

        if (!validateEmail(email)) throw new Error("Invalid email syntax");

        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
          e.currentTarget,
          process.env.NEXT_PUBLIC_EMAIL_USER_ID
        );

        dispatch({ payload: formField });
        setSuccess(true);
      } catch (e) {
        let message = "An error occured";
        if (e instanceof Error) message = e.message;
        dispatch({ payload: { error: message } });
      } finally {
        setLoading(false);
      }
    })();

    Object.values(form).join("");
  };

  return (
    <Grid item xs={12} sm={4} lg={3.5}>
      <Typography component="h4" variant="h5" color="secondary.main" mt={2}>
        Contact Form
      </Typography>
      {success ? (
        <SuccessMessage />
      ) : (
        <Box
          component="form"
          onSubmit={submitForm}
          noValidate={false}
          autoComplete="off"
        >
          {contactFormField.map((field) => (
            <Box key={field.name} sx={{ maxWidth: "25ch" }}>
              {field.name === "message" ? (
                <InputField
                  value={form[field.name as keyof typeof form]}
                  onChange={updateForm}
                  darkBg="dark"
                  textarea={true}
                  name={field.name}
                  placeholder={field.placeholder}
                />
              ) : (
                <InputField
                  value={form[field.name as keyof typeof form]}
                  onChange={updateForm}
                  darkBg="dark"
                  name={field.name}
                  placeholder={field.placeholder}
                />
              )}
            </Box>
          ))}
          <Typography sx={{ fontSize: 12 }}>{form.error}</Typography>
          <Btn
            type="submit"
            sx={{
              mt: 2,
              px: 3,
            }}
          >
            {loading ? <LoaderIcon size={22} /> : "Submit"}
          </Btn>
        </Box>
      )}
    </Grid>
  );
};

const SuccessMessage = () => {
  return (
    <Box>
      <Typography mt={1} component="h6" variant="h6">
        Thank You!
      </Typography>
      <Typography>
        Your message has been received. Expect a response from us soon.
      </Typography>
    </Box>
  );
};

export default memo(ContactForm);
