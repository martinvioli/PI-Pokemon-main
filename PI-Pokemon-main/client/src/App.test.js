import { render, screen } from "@testing-library/react";
import Home from "./components/home";
test("The creator form renders 7 inputs", () => {
  render(<Home />);
  const inputLength = screen.queryAllBy("Link");
  expect(inputLength.length).toBe(1);
});
