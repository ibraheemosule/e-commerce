import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bags, belts, shoes } from "../../../../testData";

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
interface ProductSlice {
  immutableProducts: ProductType[];
  products: ProductType[];
  cartList: CartType[];
  searchValue: string;
  filterValue: string;
  sortValue: string;
  genderValue: string;
  totalPrice: number;
}

type IMutateProducts = {
  searchValue?: string;
  filterValue?: string;
  sortValue?: string;
  genderValue?: string;
};

type CartType = {
  quantity?: number;
  id: string;
  uid: string;
  size?: string | number;
};

const initialState: ProductSlice = {
  immutableProducts: [...bags, ...shoes, ...belts],
  products: [...bags, ...shoes, ...belts],
  cartList: [],
  searchValue: "",
  filterValue: "",
  sortValue: "",
  genderValue: "",
  totalPrice: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    searchProducts(state, { payload }: PayloadAction<string>) {
      state.searchValue = payload;
      state.products = state.immutableProducts.filter((prod) =>
        prod.name.includes(payload)
      );
    },

    mutateCartList(state, { payload }: PayloadAction<CartType>) {
      const { uid } = payload;

      const uids = state.cartList.map((prod) => prod.uid);

      if (uids.includes(uid)) {
        state.cartList = state.cartList.map((prod) => {
          if (prod.uid !== uid) return prod;
          return Object.assign(prod, payload);
        });

        state.totalPrice = calculateTotalPrice(state);
        return;
      }

      const duplicateProduct = state.cartList.some(
        (prod) => prod.id === payload.id && prod.size === payload.size
      );

      if (duplicateProduct) {
        state.cartList = state.cartList.map((prod) => {
          const duplicate =
            prod.id === payload.id && prod.size === payload.size;

          if (duplicate) {
            return {
              ...prod,
              quantity: Number(prod.quantity || 1) + 1,
            };
          }

          return prod;
        });
        return;
      }

      state.cartList = [...state.cartList, { ...payload, quantity: 1 }];
      state.totalPrice = calculateTotalPrice(state);
    },

    removeFromCartList(state, { payload }: PayloadAction<CartType>) {
      state.cartList = state.cartList.filter(
        (prod) => prod.uid !== payload.uid
      );
      state.totalPrice = calculateTotalPrice(state);
    },

    updateProductInCart(
      state,
      { payload }: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = payload;

      state.cartList = [...state.cartList].map((prod) => {
        if (prod.id !== id) return prod;
        prod.quantity = quantity;
        return prod;
      });
      state.totalPrice = calculateTotalPrice(state);
    },

    mutateProductsList(state, { payload }: PayloadAction<IMutateProducts>) {
      state[Object.keys(payload)[0] as keyof IMutateProducts] =
        Object.values(payload)[0];

      state.products = state.immutableProducts.filter((prod) =>
        prod.name.includes(state.searchValue)
      );

      if (state.genderValue) {
        state.products = state.products.filter(
          (prod) => prod.gender === state.genderValue
        );
      }

      if (state.filterValue) {
        state.products = state.products.filter(
          (prod) => prod.tag === state.filterValue
        );
      }

      if (state.sortValue) {
        switch (state.sortValue) {
          case "a-z":
            console.log("here");
            state.products = [...state.products].sort((a, b) =>
              a.name > b.name ? 1 : -1
            );
            break;

          case "z-a":
            state.products = [...state.products].sort((a, b) =>
              a.name < b.name ? 1 : -1
            );
            break;

          case "highest price":
            state.products = [...state.products].sort((a, b) =>
              a.price < b.price ? 1 : -1
            );
            break;
          case "lowest price":
            state.products = [...state.products].sort((a, b) =>
              a.price > b.price ? 1 : -1
            );
            break;
          default:
        }
      }
    },
  },
});

function calculateTotalPrice(state: ProductSlice) {
  const priceSum = state.cartList.reduce((prev, next) => {
    const product = state.immutableProducts.filter(
      (prod) => prod.id === next.id
    )[0];

    return prev + product.price * (next.quantity || 1);
  }, 0);

  return priceSum;
}

export const {
  searchProducts,
  mutateCartList,
  mutateProductsList,
  updateProductInCart,
  removeFromCartList,
} = productSlice.actions;
export default productSlice.reducer;
