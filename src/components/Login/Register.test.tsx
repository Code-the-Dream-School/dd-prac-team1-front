import { render, screen } from "@testing-library/react";
import Register from "./Register";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate
}));

test("renders Register component", () => {
  render(<Register />);
  const nameElement = screen.getAllByText(/name/i);
  expect(nameElement.length).toBeGreaterThan(0);
});
