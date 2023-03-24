export type ProductType = {
  name: string;
  description: string;
  price: number;
  tag: string;
  id: string;
  images: string[];
  sizes?: (string | number)[];
  gender: string;
};

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
}

export type DeliveryDetailsType = {
  address: string;
  lastName: string;
  firstName: string;
  phoneNo: string;
  city: string;
  state: string;
};
