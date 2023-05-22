import { phoneNumberFormats } from "./utilsData";
import { ProductSlice } from "./ts-types/__store/typesProduct";
import { ProductType } from "./ts-types/__store/typesProduct";
import { toast } from "react-toastify";
import { statesInNigeria } from "./utilsData";
import Router from "next/router";

export const onlyAlphabet = (text: string) => {
  const re = /^[a-zA-Z ]+$/;
  if (text.match(re)) return true;
  return false;
};

export const validateEmail = (email: string) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
};

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    return "minimum length of 8 characters";
  }
  if (password.length > 30) {
    return "maximum length of 30 characters";
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return "uppercase letter";
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return "lowercase letter";
  }
  if (!/(?=.*\d)/.test(password)) {
    return "number";
  }
  if (!/(?=.*[^A-Za-z0-9])/.test(password)) {
    return "special character";
  }

  return "true";
};

type PaginateType = {
  arr: ProductType[];
  pageSize: number;
  pageNumber: number;
};

export const paginateFunction = ({
  arr,
  pageSize,
  pageNumber,
}: PaginateType) => {
  const start = pageSize * (pageNumber - 1);
  const end = pageSize * pageNumber;
  return {
    *[Symbol.iterator]() {
      for (let i = start; i < arr.length && i < end; i++) {
        yield arr[i];
      }
    },
  };
};

export const calculateTotalPrice = (
  state: Pick<ProductSlice, "cartList" | "immutableProducts">
) => {
  const priceSum = state.cartList.reduce((prev, next) => {
    const product = state.immutableProducts.filter(
      (prod) => prod.id === next.productId
    )[0];

    return prev + product.price * (next.quantity || 1);
  }, 0);

  return priceSum;
};

export const validatePhoneNumber = (num: number) => {
  const number = num.toString();

  if (number.startsWith("234")) {
    const invalid =
      number.length !== 13 || !phoneNumberFormats.includes(number.slice(3, 5));

    if (invalid) return false;

    return true;
  }

  if (!phoneNumberFormats.includes(number.slice(0, 2))) {
    return false;
  }

  if (number.length !== 10 || !Number.isInteger(Number(number))) {
    return false;
  }
  return true;
};

export const formatPhoneNumber = (num: number) => {
  let number = num.toString();
  if (number) {
    if (number.startsWith("234")) {
      number = "0" + number.slice(3);
    } else number = "0" + number;
  }

  return number;
};

export const formFields = (form: { [key: string]: object }) =>
  Object.keys(form).reduce(
    (prev, next) => ({
      ...prev,
      [next]: "",
    }),
    {} as Record<string, string>
  );

export const convertDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString();
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + String(minutes) : minutes;
  const dateString = `${day}/${month}/${year}`;
  const timeString = `${hours}:${minutes} ${ampm}`;
  const dateTimeString = `${dateString} ${timeString}`;
  return dateTimeString;
};

export const successPopup = (message: string) =>
  toast(message, {
    type: "success",
  });

export const errorPopup = (message: string) =>
  toast(message, {
    type: "error",
    autoClose: 2000,
  });

export const userFormValidation = (fields: { [key: string]: string }) => {
  const checkAllFieldsAreFilled = Object.keys(fields).every(
    (field) => !!fields[field]
  );

  if (!checkAllFieldsAreFilled) {
    throw Error("Some fields are empty");
  }

  if (fields.email) {
    if (!validateEmail(fields.email)) {
      throw Error("Email Format Invalid");
    }
  }

  if (fields.password) {
    if (fields.password !== fields.retypePassword) {
      throw Error("Password mismatched");
    }
    if (validatePassword(fields.password) !== "true") {
      throw Error(`password must contain ${validatePassword(fields.password)}`);
    }
  }

  if (!validatePhoneNumber(Number(fields.phoneNo))) {
    throw Error("Phone number is invalid");
  }

  if (!onlyAlphabet(fields.firstName) || !onlyAlphabet(fields.lastName)) {
    throw Error("Name should contain only letters");
  }
  if (fields.firstName.length < 3 || fields.lastName.length < 3) {
    throw Error("Name too short");
  }
  if (fields.firstName.length > 25 || fields.lastName.length > 25) {
    throw Error("Name too long");
  }
  if (!Object.keys(statesInNigeria).includes(fields.state.toLowerCase())) {
    throw Error("Invalid state provided");
  }
};

export const sessionExpired = async () => {
  errorPopup("session expired");

  await Router.push({
    pathname: "/signin",
    query: {
      session: "session expired",
    },
  });
};

export const firstLetterUpperCase = (str: string) =>
  str[0].toUpperCase() + str.slice(1);
