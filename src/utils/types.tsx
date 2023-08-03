export type AIIngredient = {
  name: string;
  quantity: string;
  unit: string;
};

export type AIRecipe = {
  categories: string;
  cookTimeInMinutes: string;
  image: string;
  ingredients: Array<AIIngredient>;
  instructions: Array<string>;
  nutritionInformation: string;
  prepTimeInMinutes: string;
  recipeComplexityLevel: string;
  recipeName: string;
  servingFor: string;
  specialDiets: Array<string>;
  tags: Array<string>;
  totalTimeInMinutes: string;
};
