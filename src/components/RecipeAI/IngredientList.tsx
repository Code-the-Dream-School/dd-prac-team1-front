import React from "react";
import { ListItem } from "@chakra-ui/react";
import { AIIngredient } from "../../utils/types";

type IngredientProps = { ingredient: AIIngredient };

const IngredientList = ({ ingredient }: IngredientProps) => {
  return (
    <ListItem>
      {`${ingredient.quantity} ${
        ingredient.unit !== "unit" ? ingredient.unit : ""
      } ${ingredient.name}`}
    </ListItem>
  );
};
export default IngredientList;
