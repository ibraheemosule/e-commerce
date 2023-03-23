import { userForm } from "../../../../../../utils/utilsData";
import { validatePhoneNumber } from "../../../../../../utils/utilsFunctions";
import { statesInNigeria } from "../../../../../../utils/utilsData";

export const validateProfileFields = (fields: DefaultFieldsType) => {
  const checkAllFieldsAreFilled = Object.keys(fields).every(
    (field) => !!fields[field]
  );
  if (!checkAllFieldsAreFilled) {
    throw Error("Some fields are empty");
  }
  if (!validatePhoneNumber(Number(fields.phoneNo))) {
    throw Error("Phone number is invalid");
  }
  if (!Object.keys(statesInNigeria).includes(fields.state.toLowerCase())) {
    throw Error("Invalid state provided");
  }
};

export const defaultFields = Object.keys(userForm).reduce((prev, key) => {
  if (["firstName", "lastName"].includes(key)) return prev;
  return {
    ...prev,
    [key]: "",
  };
}, {} as Record<string, string>);

export type DefaultFieldsType = typeof defaultFields;
