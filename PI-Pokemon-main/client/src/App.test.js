import { render, screen } from "@testing-library/react";
import Home from "./components/home";

test("renders learn react link", () => {
  render(<Home />);
  const linkElement = screen.getByText(/GO!/i);
  expect(linkElement).toBeInTheDocument();
});
