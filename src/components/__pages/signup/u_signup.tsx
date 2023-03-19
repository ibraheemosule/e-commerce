export const signupForm = {
  firstName: {
    placeholder: "First Name",
    gridProps: { xs: 12, sm: 5.5 },
  },
  lastName: {
    placeholder: "Last Name",
    gridProps: { xs: 12, sm: 5.5 },
  },
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
  address: {
    placeholder: "Address",
    gridProps: { xs: 12 },
  },
  phoneNo: {
    placeholder: "Phone Number",
    gridProps: { xs: 12, sm: 3.5 },
  },
  city: {
    placeholder: "City",
    gridProps: { xs: 12, sm: 3.5 },
  },
  state: {
    placeholder: "State",
    gridProps: { xs: 12, sm: 3.5 },
  },
};

export type SignupFormFieldsType = typeof signupFormFields;

export const signupFormFields = Object.keys(signupForm).reduce(
  (prev, next) => ({
    ...prev,
    [next]: "",
  }),
  {} as Record<string, string>
);
