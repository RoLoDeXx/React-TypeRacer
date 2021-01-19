import * as React from "react";
import { render, screen } from "@testing-library/react";
import App from "./components/App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Click on start to begin!/i);
  expect(10).toBeGreaterThan(5);
});
