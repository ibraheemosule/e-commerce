import { phoneNumberFormats } from "./utilsData";
import {
  ProductType,
  ProductSlice,
} from "../store/features/product/product-slice";

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
      (prod) => prod.id === next.id
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
      console.log("5 if");
      return false;
    }
    return true;
  }
};
