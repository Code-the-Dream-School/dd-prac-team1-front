import { render, screen, waitFor } from "@testing-library/react";
import SingleRecipePage from "./SingleRecipePage";

const mockUsedNavigate = jest.fn();
const mockUseParamsResponse = { slug: "mock_recipe_id" };
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
  // Mock the response of useParams so that there is a recipe id
  // This will trigger fetching the single recipe
  // If I don't mock this, there won't be a recipe id and an empty div will render
  useParams: () => mockUseParamsResponse
}));

// Mocked the response of getSingleRecipe in utils/__mocks__/fetchData
jest.mock("../../utils/fetchData");

test("renders SingleRecipePage component", async () => {
  render(<SingleRecipePage />);
  await waitFor(() => {
    const nameElement = screen.getByText(/strawberry smoothie/i);
    expect(nameElement).toBeInTheDocument();
  });
});

test("renders prep time when prep time is > 0", async () => {
  render(<SingleRecipePage />);
  await waitFor(() => {
    const prepElement = screen.getByText(/prep time/i);
    expect(prepElement).toBeInTheDocument();
  });
});
