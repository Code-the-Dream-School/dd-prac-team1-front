import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

test("renders Contact component", () => {
  render(<Contact />);
  const contactElement = screen.getByText(/contact/i);
  expect(contactElement).toBeInTheDocument();
});
