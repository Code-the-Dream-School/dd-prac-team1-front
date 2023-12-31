export type AIIngredient = {
  name: string;
  quantity: string;
  unit: string;
};

export type AIRecipe = {
  categories: string;
  cookTimeInMinutes: number;
  image: string;
  ingredients: Array<AIIngredient>;
  instructions: Array<string>;
  nutritionInformation: Array<number>;
  prepTimeInMinutes: number;
  recipeComplexityLevel: string;
  recipeName: string;
  servingFor: number;
  specialDiets: Array<string>;
  tags: Array<string>;
  totalTimeInMinutes: number;
};

export type SavedIngredient = {
  ingredientName: string;
  ingredientAmount: number;
  ingredientUnit: string;
  _id?: string;
};

export type RecipeNutritionInfo = {
  NutritionInfoCalories: number;
  NutritionInfoCarbs: number;
  NutritionInfoFat: number;
  NutritionInfoProtein: number;
};

export type RecipeTag = {
  tagName: string;
  _id?: string;
};

export type SavedRecipe = {
  createdAt: string;
  recipeCategory: string;
  recipeComplexityLevel: string;
  recipeCookTime: { recipeCookTimeMinutes: number };
  recipeCreatedBy: string;
  recipeImage: string;
  recipeImagePublic: string;
  recipeIngredients: Array<SavedIngredient>;
  recipeInstructions: string;
  recipeName: string;
  recipeNutritionInfo: RecipeNutritionInfo;
  recipePrepTime: { recipePrepTimeMinutes: number };
  recipeServings: number;
  recipeSpecialDiets: Array<string>;
  recipeTags: Array<RecipeTag>;
  recipeTotalTime: { recipeTotalTimeMinutes: number };
  updatedAt: string;
  __v: number;
  _id: string;
};

export type EditedRecipe = {
  createdAt: string;
  recipeCategory: string;
  recipeComplexityLevel: string;
  recipeCookTime: { recipeCookTimeMinutes: number };
  recipeCreatedBy: string;
  recipeImage: string | Object;
  recipeImagePublic: string;
  recipeIngredients: Array<SavedIngredient>;
  recipeInstructions: string;
  recipeName: string;
  recipeNutritionInfo: RecipeNutritionInfo;
  recipePrepTime: { recipePrepTimeMinutes: number };
  recipeServings: number;
  recipeSpecialDiets: Array<string> | string;
  recipeTags: Array<RecipeTag> | string;
  recipeTotalTime: { recipeTotalTimeMinutes: number };
  updatedAt: string;
  __v: number;
  _id: string;
};

export type ManualRecipe = {
  recipeCategory: string;
  recipeComplexityLevel: string;
  recipeCookTime: { recipeCookTimeMinutes: number };
  recipeImage: string | Object;
  recipeIngredients: Array<SaveIngredients>;
  recipeInstructions: string;
  recipeName: string;
  recipeNutritionInfo: RecipeNutritionInfo;
  recipePrepTime: { recipePrepTimeMinutes: number };
  recipeTotalTime: { recipeTotalTimeMinutes: number };
  recipeServings: number;
  recipeSpecialDiets: Array<string>;
  recipeTags: Array<RecipeTag>;
};

export type SaveIngredients = {
  ingredientAmount: string;
  ingredientName: string;
  ingredientUnit: string;
  _id?: string;
};

export type AmountOptions = {
  value: string;
  label: string;
};

export type Options = {
  value: string;
  label: string;
};

export type AnimationVariants = {
  rest: {
    rotate?: string;
    scale?: number;
    x?: string;
    filter?: string;
    transition?: {
      duration?: number;
      type?: string;
      ease?: string;
    };
  };
  hover: {
    x?: string;
    scale?: number;
    rotate?: string;
    filter?: string;
    transition?: {
      duration?: number;
      type?: string;
      ease?: string;
    };
  };
};

export interface PlannerRecipe extends SavedRecipe {
  uniqueKey?: string;
  mealSlot: any;
  id: string;
  name: string;
  image: string;
  _id: string;
  recipeImage: string;
  recipeName: string;
  sortOrder: number;
  mealId: string | null;
  recipeId?: string;
}

export type Id = string;

export type PlannerDays<PlannerRecipe> = {
  [index: string]: {
    name?: string;
    sortOrder: number;
    meals?: [string, string, string];
    recipes: PlannerRecipe[];
  };
};

export type FetchedPlan = {
  _id: string | null;
  mealSlot: string;
  dayOfWeek: string;
  recipeId: string;
  mealId?: string;
};

export type ErrorResponse = {
  data: {
    message?: string;
    msg?: string;
    error?: any;
  };
};

export type Error = {
  response?: ErrorResponse;
  message?: string;
};

export type HoveringButtonState = {
  [mealId: string]: boolean;
};

export type TeamMember = {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  githubUrl: string;
};
