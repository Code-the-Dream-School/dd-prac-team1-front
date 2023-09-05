import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import ShoppingListIngredient from "./ShoppingListIngredient";
import { SavedIngredient } from "../../utils/types";

type PrintShoppingListProps = { ingredients: Array<SavedIngredient> };
const PrintShoppingList = ({ ingredients }: PrintShoppingListProps) => {
  return (
    <>
      {ingredients.map(ingredient => (
        // <Box display="none">
        <Box
          key={ingredient._id}
          id="content"
          w="100%"
          // borderRadius="5"
          //   textDecoration={textDecoration}
          alignItems="center">
          <Flex>
            {`${ingredient.ingredientName} (${ingredient.ingredientAmount} ${ingredient.ingredientUnit})`}
          </Flex>
        </Box>
        // </Box>
      ))}
    </>
  );
};
export default PrintShoppingList;
