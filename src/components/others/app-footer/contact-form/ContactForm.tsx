import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputField from "../../input-field/InputField";
import Btn from "../../btn/Btn";
import useFillForm from "../../hooks/fill-form/useFillForm";
import { FormEvent, memo, useEffect } from "react";
import { contactFormField } from "./u_contactForm";

const formField = {
  fullName: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [contactForm, dispatch] = useFillForm(formField);

  const updateForm = (inputValue: { [key: string]: string }) => {
    dispatch({ payload: inputValue });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Grid item xs={12} sm={4} lg={3.5}>
      <Typography component="h4" variant="h5" color="secondary.main" mt={2}>
        Contact Form
      </Typography>
      <Box component="form" onSubmit={submitForm} autoComplete="off">
        {contactFormField.map((field) => (
          <Box key={field.name} sx={{ maxWidth: "25ch" }}>
            <InputField
              onChange={updateForm}
              darkBg="dark"
              name={field.name}
              placeholder={field.placeholder}
            />
          </Box>
        ))}
        <Btn
          type="submit"
          sx={{
            mt: 2,
            px: 3,
          }}
        >
          Submit
        </Btn>
      </Box>
    </Grid>
  );
};

export default memo(ContactForm);
