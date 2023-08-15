import React from "react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { AIIngredient } from "../../utils/types";

type IngredientProps = { ingredient: AIIngredient };

const IngredientList = ({ ingredient }: IngredientProps) => {
  return (
    <UnorderedList>
      <ListItem>
        {`${ingredient.quantity} ${
          ingredient.unit !== "unit" ? ingredient.unit : ""
        } ${ingredient.name}`}
      </ListItem>
    </UnorderedList>
  );
};
export default IngredientList;
