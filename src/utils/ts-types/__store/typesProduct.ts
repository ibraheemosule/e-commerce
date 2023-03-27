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

export interface ProductSlice {
  immutableProducts: ProductType[];
  products: ProductType[];
  cartList: CartType[];
  searchValue: string;
  filterValue: string;
  sortValue: string;
  genderValue: string;
  totalPrice: number;
  lastPaginatedNumber: number;
  paginatedList: ProductType[];
}

export type IMutateProducts = {
  searchValue?: string;
  filterValue?: string;
  sortValue?: string;
  genderValue?: string;
};

export type CartType = {
  quantity?: number;
  productId: string;
  uid: string;
  size?: string | number;
};