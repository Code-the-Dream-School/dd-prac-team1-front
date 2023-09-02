import { AxiosResponse, AxiosResponseHeaders } from "axios";
import { AIRecipe, SavedRecipe } from "../types";

const userInfo = {
  token: "token",
  username: "Rebekah"
};

const mockedRequestResponse: AxiosResponse = {
  data: userInfo,
  status: 201,
  statusText: "OK",
  headers: {},
  config: { headers: {} as AxiosResponseHeaders }
};

export function request(name: string, email: string, password: string) {
  return new Promise((resolve, reject) => {
    resolve(mockedRequestResponse);
    reject({
      error: `Login failed.`
    });
  });
}

const AIRecipes: Array<AIRecipe> = [
  {
    categories: "smoothy",
    cookTimeInMinutes: 0,
    image: "image.com",
    ingredients: [
      {
        name: "strawberries",
        quantity: "2",
        unit: "cups"
      },
      { name: "yogurt", quantity: "1", unit: "cup" }
    ],
    instructions: ["Put all ingredients in blender.", "Blend until smooth."],
    nutritionInformation: [],
    prepTimeInMinutes: 15,
    recipeComplexityLevel: "easy",
    recipeName: "Strawberry Smoothie",
    servingFor: 2,
    specialDiets: ["gluten-free", "vegetarian"],
    tags: ["breakfast"],
    totalTimeInMinutes: 15
  }
];

const mockedSearchAIResponse: AxiosResponse = {
  data: AIRecipes,
  status: 200,
  statusText: "OK",
  headers: {},
  config: { headers: {} as AxiosResponseHeaders }
};

export function searchAI(search: string, values: Array<string>) {
  return new Promise((resolve, reject) => {
    resolve(mockedSearchAIResponse);
    reject({
      error: { message: "There is an error" }
    });
  });
}

const savedRecipe: SavedRecipe = {
  createdAt: "08-01-2023",
  recipeCategory: "smoothy",
  recipeComplexityLevel: "easy",
  recipeCookTime: { recipeCookTimeMinutes: 0 },
  recipeCreatedBy: "rebekah",
  recipeImage: "image.com",
  recipeImagePublic: "image.com",
  recipeInstructions: "Put all ingredients in blender. Blend until smooth.",
  recipeName: "Strawberry Smoothie",
  recipeNutritionInfo: {
    NutritionInfoCalories: 200,
    NutritionInfoCarbs: 10,
    NutritionInfoFat: 2,
    NutritionInfoProtein: 1
  },
  recipePrepTime: { recipePrepTimeMinutes: 5 },
  recipeServings: 2,
  recipeIngredients: [
    {
      ingredientName: "strawberries",
      ingredientAmount: 2,
      ingredientUnit: "cups"
    },
    { ingredientName: "yogurt", ingredientAmount: 1, ingredientUnit: "cup" }
  ],
  recipeSpecialDiets: ["gluten-free", "vegetarian"],
  recipeTags: [{ tagName: "breakfast" }],
  recipeTotalTime: { recipeTotalTimeMinutes: 15 },
  updatedAt: "08-01-2023",
  __v: 1,
  _id: "recipe-id"
};

const mockedSavedRecipesResponse: AxiosResponse = {
  data: [savedRecipe],
  status: 200,
  statusText: "OK",
  headers: {},
  config: { headers: {} as AxiosResponseHeaders }
};

export function getRecipe() {
  return new Promise((resolve, reject) => {
    resolve(mockedSavedRecipesResponse);
    reject({
      error: { message: "There is an error" }
    });
  });
}

const mockedSavedRecipeResponse: AxiosResponse = {
  data: savedRecipe,
  status: 200,
  statusText: "OK",
  headers: {},
  config: { headers: {} as AxiosResponseHeaders }
};

export function getSingleRecipe(recipeId: string) {
  return new Promise((resolve, reject) => {
    resolve(mockedSavedRecipeResponse);
    reject({
      error: { message: "There is an error" }
    });
  });
}
