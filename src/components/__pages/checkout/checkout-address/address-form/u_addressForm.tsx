import { AddressFormFieldsType } from "./AddressForm";

import {
  onlyAlphabet,
  validatePhoneNumber,
} from "../../../../../utils/utilsFunctions";
import { statesInNigeria } from "../../../../../utils/utilsData";

export const submitSignupForm = (fields: AddressFormFieldsType) => {
  const checkAllFieldsAreFilled = Object.keys(fields).every(
    (field) => !!fields[field]
  );
  if (!checkAllFieldsAreFilled) {
    throw Error("Some fields are empty");
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
