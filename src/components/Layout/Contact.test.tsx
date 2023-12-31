import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

// This the basic structure of a React component test: render -> find element -> verify something about element
test("renders Contact component", () => {
  render(<Contact />);
  const contactElement = screen.getByText(/contact/i);
  expect(contactElement).toBeInTheDocument();
});
