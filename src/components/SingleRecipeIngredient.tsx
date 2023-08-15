import React from "react";
import { ListItem } from "@chakra-ui/react";
import { SavedIngredient } from "../utils/types";

type SingleRecipeIngredientProps = { ingredient: SavedIngredient };

const SingleRecipeIngredient = ({
  ingredient
}: SingleRecipeIngredientProps) => {
  const amount = () => {
    if (ingredient.ingredientAmount === -1) {
      return "to taste";
    } else if (ingredient.ingredientAmount === -2) {
      return "for serving";
    } else if (ingredient.ingredientAmount === -3) {
      return "for garnish";
    }
    return ingredient.ingredientAmount;
  };
  return (
    <ListItem>
      {`${amount()} 
        ${
          ingredient.ingredientUnit !== "other" ? ingredient.ingredientUnit : ""
        } ${ingredient.ingredientName}`}
    </ListItem>
  );
};
export default SingleRecipeIngredient;
