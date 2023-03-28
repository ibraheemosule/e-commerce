import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateTotalPrice } from "../../../utils/utilsFunctions";
import { ProductType } from "../../../utils/ts-types/__store/typesProduct";
import { parseEnvTestData } from "../../../utils/utilsFunctions";
import {
  ProductSlice,
  IMutateProducts,
  CartType,
} from "../../../utils/ts-types/__store/typesProduct";

const testData = parseEnvTestData(process.env.NEXT_PUBLIC_TEST_DATA);

const productDefaultState: ProductSlice = {
  immutableProducts: [...testData],
  products: [...testData],
  cartList: [],
  searchValue: "",
  filterValue: "",
  sortValue: "",
  genderValue: "",
  totalPrice: 0,
  lastPaginatedNumber: 1,
  paginatedList: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState: productDefaultState,

  reducers: {
    searchProducts(state, { payload }: PayloadAction<string>) {
      state.searchValue = payload;
      state.products = state.immutableProducts.filter((prod) =>
        prod.name.includes(payload)
      );
    },

    mutateCartList(state, { payload }: PayloadAction<CartType>) {
      const { uid, quantity } = payload;

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
        (prod) =>
          prod.productId === payload.productId && prod.size === payload.size
      );

      if (duplicateProduct) {
        state.cartList = state.cartList.map((prod) => {
          const duplicate =
            prod.productId === payload.productId && prod.size === payload.size;

          if (duplicate) {
            return {
              ...prod,
              quantity: (prod.quantity || 1) + (quantity || 1),
            };
          }

          return prod;
        });
        return;
      }

      state.cartList = [
        ...state.cartList,
        { ...payload, quantity: quantity || 1 },
      ];
      state.totalPrice = calculateTotalPrice(state);
    },

    removeFromCartList(state, { payload }: PayloadAction<CartType>) {
      state.cartList = state.cartList.filter(
        (prod) => prod.uid !== payload.uid
      );
      state.totalPrice = calculateTotalPrice(state);
    },

    resetProductsList(state) {
      state.products = [...state.immutableProducts];
      state.filterValue = state.genderValue = state.searchValue = "";
      state.lastPaginatedNumber = 1;
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
      state.lastPaginatedNumber = 1;
    },

    setPaginatedList(state, action: PayloadAction<ProductType[]>) {
      state.paginatedList = action.payload;
    },
    setLastPaginatedNumber(state, action: PayloadAction<number>) {
      state.lastPaginatedNumber = action.payload;
    },
  },
});

export const {
  searchProducts,
  mutateCartList,
  mutateProductsList,
  setPaginatedList,
  setLastPaginatedNumber,
  resetProductsList,
  removeFromCartList,
} = productSlice.actions;
export default productSlice.reducer;
