import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "./features/counter/counter-slice";
import { apiSlice } from "./features/dogs/dogs-api-slice";
import type { PreloadedState } from "@reduxjs/toolkit";
import userSliceReducer from "./features/user/user-slice";
import productSlice from "./features/product/product-slice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSliceReducer,
  product: productSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeInstance = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }).concat(apiSlice.middleware),
  });

export const store = storeInstance();

export type RootState = ReturnType<typeof rootReducer>;

export type StoreType = ReturnType<typeof storeInstance>;

export type AppDispatch = StoreType["dispatch"];

export const persistor = persistStore(store);
