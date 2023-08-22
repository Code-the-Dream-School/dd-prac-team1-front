import React from "react";
import { ListItem } from "@chakra-ui/react";
import { AIIngredient } from "../../utils/types";

type IngredientProps = { ingredient: AIIngredient };

const IngredientList = ({ ingredient }: IngredientProps) => {
  return (
    <ListItem>
      {`${ingredient.name} 
      ${ingredient.quantity} 
       ${
         ingredient.quantity === "to taste" ||
         ingredient.quantity === "for serving" ||
         ingredient.quantity === "for garnish" ||
         ingredient.unit === "unit"
           ? ""
           : ingredient.unit
       }
      `}
    </ListItem>
  );
};
export default IngredientList;
