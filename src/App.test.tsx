import { render, screen } from "@testing-library/react";

import App from "./App";

test("Renders the App component", () => {
  render(<App />);
  const appTitle = screen.getByText("Wordle");
  expect(appTitle).toBeInTheDocument();
});
