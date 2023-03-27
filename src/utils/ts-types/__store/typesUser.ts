import { ProductType } from "./typesProduct";

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  phoneNo: string;
};

export interface UserSlice {
  signin: boolean;
  deliveryDetails: DeliveryDetailsType;
  userInfo: UserType;
  orders: OrderType[];
}

export type DeliveryDetailsType = {
  address: string;
  lastName: string;
  firstName: string;
  phoneNo: string;
  city: string;
  state: string;
};

export type PastPurchaseProductType = ProductType & {
  size?: string | number;
  quantity: number;
};

export interface OrderType {
  pastPurchases: PastPurchaseProductType[];
  createdAt: string;
  amount: number;
}
