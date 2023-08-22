import React, { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { getIngredientsFromShoppingList } from "../../utils/fetchData";

const ShoppingList = () => {
  useEffect(() => {
    getIngredientsFromShoppingList()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Text>Future shopping list</Text>;
};
export default ShoppingList;
