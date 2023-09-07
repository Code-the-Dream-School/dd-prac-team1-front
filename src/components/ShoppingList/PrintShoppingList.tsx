import React from "react";
import {
  Box,
  Container,
  Image,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from "@chakra-ui/react";
import ShoppingListIngredient from "./ShoppingListIngredient";
import { SavedIngredient } from "../../utils/types";

type PrintShoppingListProps = { ingredients: Array<SavedIngredient> };
const PrintShoppingList = ({ ingredients }: PrintShoppingListProps) => {
  return (
    <Container maxW="5xl">
      <Flex alignItems="center" justifyContent="center">
        <Image src="../../../public/email_logo.png" alt="Email-logo" />

        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Ingredient</Th>
                <Th>Amount</Th>
                <Th>Unit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ingredients.map(ingredient => (
                <Tr key={ingredient._id}>
                  <Td>{ingredient.ingredientName}</Td>
                  <Td>{ingredient.ingredientAmount}</Td>
                  <Td>{ingredient.ingredientUnit}</Td>
                </Tr>
              ))}
            </Tbody>
            {/* <Box
              id="content"
              w="100%"
              // borderRadius="5"
              //   textDecoration={textDecoration}
              alignItems="center">
              <Flex>
                {`${ingredient.ingredientName} (${ingredient.ingredientAmount} ${ingredient.ingredientUnit})`}
              </Flex>
            </Box> */}
          </Table>
        </TableContainer>
      </Flex>
    </Container>
  );
};
export default PrintShoppingList;
