import { render, screen, waitFor } from "@testing-library/react";
import SingleRecipePage from "./SingleRecipePage";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate
}));

jest.mock("../../utils/fetchData");

test("renders SingleRecipePage component", async () => {
  render(
    <SingleRecipePage testProps={{ initialRecipeId: "test", isTest: true }} />
  );
  await waitFor(() => {
    const nameElement = screen.getByText(/strawberry smoothie/i);
    expect(nameElement).toBeInTheDocument();
  });
});

test("renders prep time when prep time is > 0", async () => {
  render(
    <SingleRecipePage testProps={{ initialRecipeId: "test", isTest: true }} />
  );
  await waitFor(() => {
    const prepElement = screen.getByText(/prep time/i);
    expect(prepElement).toBeInTheDocument();
  });
});
