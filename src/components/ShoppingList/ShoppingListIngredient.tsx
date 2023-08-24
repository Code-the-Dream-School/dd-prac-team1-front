import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Flex,
  Icon,
  IconButton,
  Text
} from "@chakra-ui/react";
import { SavedIngredient } from "../../utils/types";
import { GiPencil } from "react-icons/gi";
import { CheckIcon } from "@chakra-ui/icons";
import { GrClose } from "react-icons/gr";

type ShoppingListIngredientProps = {
  ingredient: SavedIngredient;
  onChange: Function;
  handleEditAmount: Function;
  handleRemoveButton: Function;
  defaultChecked: boolean;
};

const ShoppingListIngredient = ({
  ingredient,
  onChange,
  handleEditAmount,
  handleRemoveButton,
  defaultChecked
}: ShoppingListIngredientProps) => {
  const [isEditIngredient, setIsEditIngredient] = useState<string>("");

  return (
    <>
      {isEditIngredient === ingredient._id ? (
        <Box
          borderColor="green"
          w="100%"
          m="2"
          borderWidth="thin"
          borderRadius="5">
          <Grid
            templateColumns="repeat(12, 1fr)"
            w="100%"
            gap="2"
            alignItems="center">
            <GridItem colSpan={1} w="100%">
              <Checkbox
                size="lg"
                h="14"
                colorScheme="gray"
                id={ingredient._id}
                defaultChecked={defaultChecked}
                onChange={e => onChange(e)}
              />
            </GridItem>
            <GridItem colSpan={1} w="100%">
              <Text>{ingredient.ingredientName} (</Text>
            </GridItem>
            <GridItem colSpan={3} w="100%">
              <InputGroup>
                <Input
                  type="number"
                  value={ingredient.ingredientAmount}
                  id={ingredient._id}
                  autoFocus
                  onChange={e => handleEditAmount(e)}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      setIsEditIngredient("");
                    }
                  }}
                />
                <InputRightElement>
                  <Icon
                    as={CheckIcon}
                    onClick={() => {
                      setIsEditIngredient("");
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            </GridItem>
            <GridItem colSpan={5} w="100%">
              <Text textAlign="left">) {ingredient.ingredientUnit} </Text>
            </GridItem>
            <GridItem colSpan={1} w="100%" p="2">
              <IconButton
                aria-label="Edit ingredient's amount"
                size="lg"
                variant="ghost"
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
                size="lg"
                variant="ghost"
                id={ingredient._id}
                icon={<GrClose />}
                onClick={() => handleRemoveButton(ingredient._id)}
              />
            </GridItem>
          </Grid>
        </Box>
      ) : (
        <Box
          borderColor="green"
          w="100%"
          m="2"
          borderWidth="thin"
          borderRadius="5"
          alignItems="center">
          <Grid
            templateColumns="repeat(12, 1fr)"
            w="100%"
            gap="2"
            alignItems="center">
            <GridItem colSpan={10} w="100%">
              <Button
                variant="ghost"
                size="lg"
                w="100%"
                m="1"
                bg="white"
                borderColor="green"
                justifyContent="left">
                <Checkbox
                  size="lg"
                  h="14"
                  colorScheme="gray"
                  id={ingredient._id}
                  defaultChecked={defaultChecked}
                  onChange={e => onChange(e)}>
                  <Flex>
                    {`${ingredient.ingredientName} (${ingredient.ingredientAmount} ${ingredient.ingredientUnit})`}
                  </Flex>
                </Checkbox>
              </Button>
            </GridItem>
            <GridItem colSpan={1} w="100%" p="2">
              <IconButton
                aria-label="Edit ingredient's amount"
                size="lg"
                variant="ghost"
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
                size="lg"
                variant="ghost"
                icon={<GrClose />}
                onClick={() => handleRemoveButton(ingredient._id)}
              />
            </GridItem>
          </Grid>
        </Box>
      )}
    </>
  );
};
export default ShoppingListIngredient;
