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

export type DeliveryDetailsType = Omit<UserType, "email">;

export type PurchaseProductType = {
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
  buyer: string;
  items: PurchaseProductType[];
  time: string;
  amount: number;
  deliveryDetails: DeliveryDetailsType;
}
