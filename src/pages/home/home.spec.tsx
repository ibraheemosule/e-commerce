import { screen } from "@testing-library/react";
import HomePage from "./home.pg";
import { renderWithProviders } from "../../utils/test-utils";

describe("Home page test", () => {
  it("should render to the dom", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText("Welcome to next.js")).toBeTruthy();
  });
});
