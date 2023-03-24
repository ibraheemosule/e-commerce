import { userForm } from "../../../../../../utils/utilsData";
import {
  validatePhoneNumber,
  validateEmail,
} from "../../../../../../utils/utilsFunctions";
import { statesInNigeria } from "../../../../../../utils/utilsData";

export const validateProfileFields = (fields: DefaultFieldsType) => {
  const checkAllFieldsAreFilled = Object.keys(fields).every(
    (field) => !!fields[field]
  );
  if (!checkAllFieldsAreFilled) {
    throw Error("Some fields are empty");
  }
  if (!validateEmail(fields.email)) {
    throw Error("Email Format Invalid");
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

export const defaultFields = Object.keys(fullProfile).reduce(
  (prev, key) => {
    if (["firstName", "lastName"].includes(key)) return prev;
    return {
      ...prev,
      [key]: "",
    };
  },
  { email: "" } as Record<string, string>
);

export type DefaultFieldsType = typeof defaultFields;
