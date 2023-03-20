import { userForm } from "../../../../utils/utilsData";
import { formFields } from "../../../../utils/utilsFunctions";
import { AddressFormFieldsType } from "./address-form/AddressForm";
import { statesInNigeria } from "../../../../utils/utilsData";
import {
  onlyAlphabet,
  validatePhoneNumber,
} from "../../../../utils/utilsFunctions";

export const formControlStyle = {
  color: "primary.dark",
  ".Mui-focused": {
    color: "primary.dark",
  },
  ".MuiFormLabel-root": {
    color: "primary.dark",
  },
  ".css-gj1jc1-MuiFormLabel-root.Mui-focused": { color: "primary.dark" },
  ".MuiFormControlLabel-label": {
    fontWeight: 600,
  },
};

export const validateAddressForm = (fields: AddressFormFieldsType) => {
  const checkAllFieldsAreFilled = Object.keys(fields).every(
    (field) => !!fields[field]
  );

  if (!checkAllFieldsAreFilled) {
    throw Error("Some fields are empty");
  }
  if (fields.password !== fields.retypePassword) {
    throw Error("Password mismatched");
  }
  if (!validatePhoneNumber(Number(fields.phoneNo))) {
    throw Error("Phone number is invalid");
  }
  if (!onlyAlphabet(fields.firstName) || !onlyAlphabet(fields.lastName)) {
    throw Error("Name should contain only letters");
  }
  if (!Object.keys(statesInNigeria).includes(fields.state.toLowerCase())) {
    throw Error("Invalid state provided");
  }
};

export const addressFields = formFields(userForm);
