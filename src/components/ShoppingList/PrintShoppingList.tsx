import React from "react";
import {
  Container,
  Image,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from "@chakra-ui/react";
import { SavedIngredient } from "../../utils/types";

type PrintShoppingListProps = { ingredients: Array<SavedIngredient> };
const PrintShoppingList = ({ ingredients }: PrintShoppingListProps) => {
  return (
    <Container maxW="5xl">
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Image src="/images/Logo_Olivier.svg" alt="logo" mb="7" />
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
          </Table>
        </TableContainer>
      </Flex>
    </Container>
  );
};
export default PrintShoppingList;
