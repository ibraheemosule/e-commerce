import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import type { PreloadedState } from "@reduxjs/toolkit";
import userSliceReducer from "./features/user/user-slice";
import productSliceReducer from "./features/product/product-slice";
import { newUserSlice } from "./features/new-user/new-user-slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["product", "user", newUserSlice.reducerPath],
};

const rootReducer = combineReducers({
  user: userSliceReducer,
  product: productSliceReducer,
  [newUserSlice.reducerPath]: newUserSlice.reducer,
  newUser: newUserSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const storeInstance = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(newUserSlice.middleware),
  });

export const store = storeInstance();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export type StoreType = ReturnType<typeof storeInstance>;

export type AppDispatch = StoreType["dispatch"];

export const persistor = persistStore(store, {}, () => persistor.persist());
