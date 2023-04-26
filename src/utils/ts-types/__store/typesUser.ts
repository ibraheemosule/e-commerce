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

export type PastPurchaseProductType = {
  size?: string | number;
  quantity: number;
  image: string;
  id: string;
  tag: string;
  gender: "male" | "female" | "unisex";
  name: string;
  price: number;
};

export interface OrderType {
  pastPurchases: PastPurchaseProductType[];
  createdAt: string;
  amount: number;
}
