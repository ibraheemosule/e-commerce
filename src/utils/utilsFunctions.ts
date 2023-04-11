import { phoneNumberFormats } from "./utilsData";
import { ProductSlice } from "./ts-types/__store/typesProduct";
import { ProductType } from "./ts-types/__store/typesProduct";
import { toast } from "react-toastify";

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
  if (!/(?=.*[A-Z])/.test(password)) {
    return "uppercase letter";
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return "lowercase letter";
  }
  if (!/(?=.*\d)/.test(password)) {
    return "number";
  }
  if (!/(?=.*[^A-Za-z0-9<>])/.test(password)) {
    return "special character (excluding < and >)";
  }
  if (password.length < 8) {
    return "minimum length of 8 characters";
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

export const calculateTotalPrice = (state: ProductSlice) => {
  const priceSum = state.cartList.reduce((prev, next) => {
    const product = state.immutableProducts.filter(
      (prod) => prod.id === next.productId
    )[0];

    return prev + product.price * (next.quantity || 1);
  }, 0);

  return priceSum;
};

export const validatePhoneNumber = (number: number) => {
  if (!phoneNumberFormats.includes(number.toString().slice(0, 3))) {
    return false;
  }

  if (number.toString().length < 11 || !Number.isInteger(number)) {
    return false;
  }

  if (number.toString().length === 11) {
    return true;
  }

  if (number.toString().startsWith("234")) {
    const checkValidity = phoneNumberFormats.some((format) =>
      number.toString().startsWith(format)
    );

    if (!checkValidity || number.toString().length !== 13) {
      return false;
    }
    return true;
  }
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
    autoClose: 5000,
  });
