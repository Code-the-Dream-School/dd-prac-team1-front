import React from "react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { SavedIngredient } from "../../utils/types";

type SingleRecipeIngredientsProps = { ingredient: SavedIngredient };

const SingleRecipeIngredients = ({
  ingredient
}: SingleRecipeIngredientsProps) => {
  return (
    <UnorderedList>
      <ListItem>
        {`${
          ingredient.ingredientAmount === 0
            ? ""
            : ingredient.ingredientAmount !== -1
            ? ingredient.ingredientAmount
            : "to taste"
        } ${
          ingredient.ingredientAmount === 0
            ? ""
            : ingredient.ingredientUnit !== "other"
            ? ingredient.ingredientUnit
            : ""
        } ${ingredient.ingredientName}`}
      </ListItem>
    </UnorderedList>
  );
};
export default SingleRecipeIngredients;
