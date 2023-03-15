import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bags, belts, shoes } from "../../../../testData";

type ProductType = (typeof bags)[0] | (typeof shoes)[0] | (typeof belts)[0];
interface ProductSlice {
  immutableProducts: ProductType[];
  products: ProductType[];
  cartList: { quantity: number; id: string }[];
  searchValue: string;
  filterValue: string;
  sortValue: string;
  genderValue: string;
}

type IMutateProducts = {
  searchValue?: string;
  filterValue?: string;
  sortValue?: string;
  genderValue?: string;
};

const initialState: ProductSlice = {
  immutableProducts: [...bags, ...shoes, ...belts],
  products: [...bags, ...shoes, ...belts],
  cartList: [],
  searchValue: "",
  filterValue: "",
  sortValue: "",
  genderValue: "",
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

    mutateCartList(
      state,
      { payload }: PayloadAction<{ id: string; quantity?: number }>
    ) {
      const { id, quantity = 1 } = payload;

      const ids = state.cartList.map((prod) => prod.id);

      if (ids.includes(id)) {
        state.cartList = state.cartList.filter((prod) => prod.id !== id);
        return;
      }

      state.cartList = [
        ...state.cartList,
        {
          id,
          quantity,
        },
      ];

      console.log(state.cartList);
    },

    updateProductInCart(
      state,
      { payload }: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = payload;

      const productFromCart = state.cartList.filter((prod) => prod.id !== id);

      state.cartList = [...productFromCart, { id, quantity }];
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

export const {
  searchProducts,
  mutateCartList,
  mutateProductsList,
  updateProductInCart,
} = productSlice.actions;
export default productSlice.reducer;
