import { Dispatch, FormEvent, SetStateAction } from "react";
import { SignupFormFieldsType } from "../u_signup";
import {
  validateEmail,
  validatePassword,
  onlyAlphabet,
  validatePhoneNumber,
} from "../../../../utils/utilsFunctions";
import { statesInNigeria } from "../../../../utils/utilsData";

export const submitSignupForm = (
  e: FormEvent<HTMLFormElement>,
  setError: Dispatch<SetStateAction<string>>,
  fields: SignupFormFieldsType
) => {
  e.preventDefault();
  const checkAllFieldsAreFilled = Object.keys(fields).every(
    (field) => !!fields[field]
  );

  if (!checkAllFieldsAreFilled) {
    setError("Some fields are empty");
    return;
  }
  if (fields.password !== fields.retypePassword) {
    setError("Password mismatched");
    return;
  }
  if (!validateEmail(fields.email)) {
    setError("Email Format Invalid");
    return;
  }
  if (!validatePhoneNumber(Number(fields.phoneNo))) {
    setError("Phone number is invalid");
    return;
  }
  if (validatePassword(fields.password) !== "true") {
    setError(`password must contain ${validatePassword(fields.password)}`);
    return;
  }
  if (!onlyAlphabet(fields.firstName) || !onlyAlphabet(fields.lastName)) {
    setError("Name should contain only letters");
    return;
  }
  if (!Object.keys(statesInNigeria).includes(fields.state.toLowerCase())) {
    setError("Invalid state provided");
    return;
  }
};

// const submitForm = (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   const checkAllFieldsAreFilled = Object.keys(fields).every(
//     field => !!fields[field]
//   );

//   if (!checkAllFieldsAreFilled) {
//     setError("Some fields are empty");
//     return;
//   }
//   if (fields.password !== fields.retypePassword) {
//     setError("Password mismatched");
//     return;
//   }
//   if (!validateEmail(fields.email)) {
//     setError("Email Format Invalid");
//     return;
//   }
//   if (!validatePhoneNumber(Number(fields.phoneNo))) {
//     setError("Phone number is invalid");
//     return;
//   }
//   if (validatePassword(fields.password) !== "true") {
//     setError(`password must contain ${validatePassword(fields.password)}`);
//     return;
//   }
//   if (!onlyAlphabet(fields.firstName) || !onlyAlphabet(fields.lastName)) {
//     setError("Name should contain only letters");
//     return;
//   }
//   if (!Object.keys(statesInNigeria).includes(fields.state.toLowerCase())) {
//     setError("Invalid state provided");
//     return;
//   }
// };
