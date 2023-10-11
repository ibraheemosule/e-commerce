import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputField from "../input-field/InputField";
import useFillForm from "../hooks/fill-form/useFillForm";
import { FC, FormEvent, memo, useEffect, useState } from "react";
import { contactFormField } from "./u_contactForm";
import { onlyAlphabet, validateEmail } from "../../../utils/utilsFunctions";
import emailjs from "@emailjs/browser";
import FormBtn from "../btn/form-btn/FormBtn";
import { errorPopup } from "../../../utils/utilsFunctions";
import useReCaptcha from "../hooks/recaptcha/useRecaptcha";

const formField = {
  fullName: "",
  email: "",
  message: "",
};

const ContactForm: FC<PropType> = ({ bg, maxWidth }) => {
  const [form, dispatch] = useFillForm(formField);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const recaptcha = useReCaptcha();

  useEffect(() => setError(""), [form]);

  useEffect(() => {
    if (error) {
      errorPopup(error);
    }
  }, [error]);

  const updateForm = (inputValue: { [key: string]: string }) => {
    dispatch({ payload: inputValue });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fullName, email, message } = form;
    void (async () => {
      setLoading(true);
      try {
        if (!fullName.trim() || !email.trim() || !message.trim())
          throw new Error("Some fields are empty");

        const checkForScripts = Object.values(form).join("").includes("<");
        if (checkForScripts) throw new Error(`Character '<' not allowed`);

        if (!onlyAlphabet(form.fullName))
          throw new Error("Invalid character in name field");

        if (!validateEmail(email)) throw new Error("Invalid email syntax");
        const formData = e.currentTarget;

        // await recaptcha('contactFrom1907');

        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
          formData,
          process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
        );

        dispatch({ payload: formField });
        setError("");
        setSuccess(true);
      } catch (e) {
        let message = "An error occured";
        if (e instanceof Error) message = e.message;
        setError(message);
      } finally {
        setLoading(false);
      }
    })();

    Object.values(form).join("");
  };

  return (
    <>
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
          sx={{
            display: maxWidth ? "inline-block" : "block",
            marginRight: "auto",
          }}
        >
          {contactFormField.map((field) => (
            <Box key={field.name} sx={{ maxWidth: maxWidth ?? "none" }}>
              {field.name === "message" ? (
                <InputField
                  value={form[field.name as keyof typeof form]}
                  onChange={updateForm}
                  darkBg={bg}
                  textarea={true}
                  name={field.name}
                  placeholder={field.placeholder}
                />
              ) : (
                <InputField
                  value={form[field.name as keyof typeof form]}
                  onChange={updateForm}
                  darkBg={bg}
                  name={field.name}
                  placeholder={field.placeholder}
                />
              )}
            </Box>
          ))}
          <FormBtn error={error} text="submit" loading={loading} />
        </Box>
      )}
    </>
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

type PropType = {
  bg?: "dark";
  maxWidth?: string;
};

export default memo(ContactForm);
