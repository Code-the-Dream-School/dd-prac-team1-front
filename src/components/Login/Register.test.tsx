import { render, screen } from "@testing-library/react";
import Register from "./Register";

// Have to mock this because `useNavigate` is supposed to be used within a
// but we are rendering this component in isolation
// If I wanted to test navigation, I would have wrapped <Register/> in <BrowserRouter/> below instead
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
