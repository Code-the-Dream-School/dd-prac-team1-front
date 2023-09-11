import React from "react";
import { ListItem } from "@chakra-ui/react";
import { AIIngredient } from "../../utils/types";

type IngredientProps = { ingredient: AIIngredient };

const IngredientList = ({ ingredient }: IngredientProps) => {
  const hideUnits =
    ingredient.quantity === "to taste" ||
    ingredient.quantity === "for serving" ||
    ingredient.quantity === "for garnish" ||
    ingredient.quantity === "to serve" ||
    ingredient.quantity === "to garnish";

  return (
    <ListItem>
      {`${ingredient.name} 
      ${!hideUnits ? ingredient.quantity.split(" ")[0] : ingredient.quantity} 
       ${
         hideUnits || ingredient.unit === "unit" || ingredient.unit === "other"
           ? ""
           : ingredient.unit
       }
      `}
    </ListItem>
  );
};
export default IngredientList;
