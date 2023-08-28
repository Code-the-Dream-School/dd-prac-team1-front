import React, { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Input,
  Checkbox,
  Flex,
  IconButton,
  Text
} from "@chakra-ui/react";
import { SavedIngredient } from "../../utils/types";
import { GiPencil } from "react-icons/gi";
import { MdCheck, MdClose } from "react-icons/md";

type ShoppingListIngredientProps = {
  ingredient: SavedIngredient;
  onChange: Function;
  handleEditAmount: Function;
  handleRemoveIngredient: Function;
  handleEditIngredient: Function;
  defaultChecked: boolean;
  textDecoration: string;
};

const ShoppingListIngredient = ({
  ingredient,
  onChange,
  handleEditAmount,
  handleRemoveIngredient,
  handleEditIngredient,
  defaultChecked,
  textDecoration
}: ShoppingListIngredientProps) => {
  const [isEditIngredient, setIsEditIngredient] = useState<string>("");

  return (
    <>
      {isEditIngredient === ingredient._id ? (
        <Box
          key="option1"
          borderColor="green"
          w="100%"
          mb="-1px"
          borderWidth="thin"
          textDecoration={textDecoration}>
          <Grid
            templateColumns="repeat(12, 1fr)"
            w="100%"
            gap="2"
            alignItems="center">
            <GridItem colSpan={10} w="100%" gap="6">
              <Flex pl="5" alignItems="center">
                <Checkbox
                  size="lg"
                  colorScheme="gray"
                  name={ingredient.ingredientName}
                  defaultChecked={defaultChecked}
                  onChange={e => onChange(e)}
                />
                <Text ml="2" fontSize="18">
                  {ingredient.ingredientName} (
                </Text>
                <Input
                  type="number"
                  w="20"
                  fontSize="18"
                  value={ingredient.ingredientAmount}
                  name={ingredient.ingredientName}
                  id={ingredient._id}
                  autoFocus
                  onChange={e => handleEditAmount(e)}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      handleEditIngredient(e);
                      setIsEditIngredient("");
                    }
                  }}
                  onBlur={e => {
                    handleEditIngredient(e);
                    setIsEditIngredient("");
                  }}
                />
                <Text textAlign="left" fontSize="18">
                  ) {ingredient.ingredientUnit}{" "}
                </Text>
              </Flex>
            </GridItem>
            <GridItem colSpan={1} w="100%" p="2">
              <IconButton
                aria-label="Edit ingredient amount"
                size="sm"
                variant="ghost"
                color="#505050"
                icon={<MdCheck style={{ fontSize: 20 }} />}
                onClick={e => {
                  handleEditIngredient(e);
                  setIsEditIngredient("");
                }}
              />
            </GridItem>
            <GridItem colSpan={1} w="100%" p="2" flexShrink="0"></GridItem>
          </Grid>
        </Box>
      ) : (
        <Box
          key="option2"
          borderColor="green"
          w="100%"
          mb="-1px"
          borderWidth="thin"
          // borderRadius="5"
          textDecoration={textDecoration}
          alignItems="center">
          <Grid
            templateColumns="repeat(12, 1fr)"
            w="100%"
            gap="2"
            alignItems="center">
            <GridItem colSpan={10} w="100%">
              <Flex pl="5">
                <Checkbox
                  size="lg"
                  colorScheme="gray"
                  name={ingredient.ingredientName}
                  defaultChecked={defaultChecked}
                  onChange={e => onChange(e)}>
                  <Flex>
                    {`${ingredient.ingredientName} (${ingredient.ingredientAmount} ${ingredient.ingredientUnit})`}
                  </Flex>
                </Checkbox>
              </Flex>
            </GridItem>
            <GridItem colSpan={1} w="100%" p="2">
              <IconButton
                aria-label="Edit ingredient's amount"
                size="sm"
                variant="ghost"
                color="#505050"
                icon={<GiPencil />}
                onClick={() => {
                  if (ingredient._id !== undefined)
                    setIsEditIngredient(ingredient._id);
                }}
              />
            </GridItem>
            <GridItem colSpan={1} w="100%" p="2">
              <IconButton
                aria-label="Delete ingredient"
                size="sm"
                variant="ghost"
                color="#505050"
                icon={<MdClose style={{ fontSize: "20" }} />}
                onClick={() =>
                  handleRemoveIngredient(ingredient.ingredientName)
                }
              />
            </GridItem>
          </Grid>
        </Box>
      )}
    </>
  );
};
export default ShoppingListIngredient;
