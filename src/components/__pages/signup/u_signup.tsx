import { userForm } from "../../../utils/utilsData";
import { formFields } from "../../../utils/utilsFunctions";

export const signupForm = {
  firstName: userForm.firstName,
  lastName: userForm.lastName,
  email: {
    placeholder: "Email",
    gridProps: { xs: 12 },
    name: "email",
  },
  password: {
    placeholder: "Password",
    gridProps: { xs: 12, sm: 5.5 },
  },
  retypePassword: {
    placeholder: "Retype Password",
    gridProps: { xs: 12, sm: 5.5 },
  },
  address: userForm.address,
  phoneNo: userForm.phoneNo,
  city: userForm.city,
  state: userForm.state,
};

export type SignupFormFieldsType = typeof signupFormFields;

export const signupFormFields = formFields(signupForm);
