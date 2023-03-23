import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { storeInstance, RootState, StoreType } from "../store/store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: StoreType;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = storeInstance(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
