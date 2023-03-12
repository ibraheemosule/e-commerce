import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counter-slice";
import { apiSlice } from "./features/dogs/dogs-api-slice";
import type { PreloadedState } from "@reduxjs/toolkit";
import userSliceReducer from "./features/user/user-slice";
import productSlice from "./features/product/product-slice";

const rootReducer = combineReducers({
  user: userSliceReducer,
  product: productSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,

    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(apiSlice.middleware);
    },
  });

export type RootState = ReturnType<typeof rootReducer>;
export type StoreType = ReturnType<typeof store>;
export type AppDispatch = StoreType["dispatch"];
