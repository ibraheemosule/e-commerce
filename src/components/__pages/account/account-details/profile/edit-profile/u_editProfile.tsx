import { userForm } from "../../../../../../utils/utilsData";
import {
  validatePhoneNumber,
  onlyAlphabet,
} from "../../../../../../utils/utilsFunctions";
import { statesInNigeria } from "../../../../../../utils/utilsData";

export const validateProfileFields = (fields: DefaultFieldsType) => {
  const checkAllFieldsAreFilled = Object.keys(fields).every(
    (field) => !!fields[field]
  );
  if (!checkAllFieldsAreFilled) {
    throw Error("Some fields are empty");
  }
  if (!onlyAlphabet(fields.firstName) || !onlyAlphabet(fields.lastName)) {
    throw Error("Name should contain only letters");
  }
  if (!validatePhoneNumber(Number(fields.phoneNo))) {
    throw Error("Phone number is invalid");
  }
  if (!Object.keys(statesInNigeria).includes(fields.state.toLowerCase())) {
    throw Error("Invalid state provided");
  }
};

export const fullProfile = {
  ...userForm,
  email: {
    placeholder: "Email",
  },
};

export const defaultFields = Object.keys(fullProfile).reduce((prev, key) => {
  if (["email"].includes(key)) return prev;
  return {
    ...prev,
    [key]: "",
  };
}, {} as Record<string, string>);

export type DefaultFieldsType = typeof defaultFields;
