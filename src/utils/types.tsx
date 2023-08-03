export type AIIngredient = {
  name: string;
  quantity: string;
};

export type AIRecipe = {
  cookTimeInMinutes: string;
  image: string;
  ingredients: Array<AIIngredient>;
  instructions: Array<string>;
  nutritionInformation: string;
  prepTimeInMinutes: string;
  recipeName: string;
  servingFor: string;
  specialDiets: Array<string>;
  tags: Array<string>;
  totalTimeInMinutes: string;
};
