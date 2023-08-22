import React, { useState, useEffect } from "react";
import { Box, Input, Text, UnorderedList } from "@chakra-ui/react";
import { getIngredientsFromShoppingList } from "../../utils/fetchData";
import { SavedIngredient } from "../../utils/types";

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<Array<SavedIngredient>>([]);
  useEffect(() => {
    getIngredientsFromShoppingList()
      .then(response => {
        console.log(response);
        setIngredients(response.data.ingredients);
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(ingredients);
  return (
    <Box>
      {ingredients.map(ingredient => (
        <>
          <Input value={ingredient.ingredientName} />
          <Input value={ingredient.ingredientAmount} />
          <Input value={ingredient.ingredientUnit} />
        </>
      ))}
    </Box>
  );
};
export default ShoppingList;
