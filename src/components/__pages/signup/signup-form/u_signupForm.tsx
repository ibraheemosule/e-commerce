import { SignupFormFieldsType } from "../u_signup";
import {
  validateEmail,
  validatePassword,
  onlyAlphabet,
  validatePhoneNumber,
} from "../../../../utils/utilsFunctions";
import { statesInNigeria } from "../../../../utils/utilsData";

export const submitSignupForm = (fields: SignupFormFieldsType) => {
  const checkAllFieldsAreFilled = Object.keys(fields).every(
    (field) => !!fields[field]
  );

  if (!checkAllFieldsAreFilled) {
    throw Error("Some fields are empty");
  }
  if (fields.password !== fields.retypePassword) {
    throw Error("Password mismatched");
  }
  if (!validateEmail(fields.email)) {
    throw Error("Email Format Invalid");
  }
  if (!validatePhoneNumber(Number(fields.phoneNo))) {
    throw Error("Phone number is invalid");
  }
  if (validatePassword(fields.password) !== "true") {
    throw Error(`password must contain ${validatePassword(fields.password)}`);
  }
  if (!onlyAlphabet(fields.firstName) || !onlyAlphabet(fields.lastName)) {
    throw Error("Name should contain only letters");
  }
  if (!Object.keys(statesInNigeria).includes(fields.state.toLowerCase())) {
    throw Error("Invalid state provided");
  }
};
