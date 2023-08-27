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
          borderColor="green"
          w="100%"
          mb="1"
          borderWidth="thin"
          textDecoration={textDecoration}
          borderRadius="5">
          <Grid
            templateColumns="repeat(12, 1fr)"
            w="100%"
            gap="2"
            alignItems="center">
            <GridItem colSpan={10} w="100%" gap="6">
              <Flex pl="7" alignItems="center">
                <Checkbox
                  size="lg"
                  h="14"
                  colorScheme="gray"
                  name={ingredient.ingredientName}
                  defaultChecked={defaultChecked}
                  onChange={e => onChange(e)}
                />

                {/* </GridItem>
            <GridItem colSpan={2} w="100%"> */}
                <Text ml="2" fontSize="18">
                  {ingredient.ingredientName} (
                </Text>
                {/* </GridItem>
            <GridItem colSpan={2} w="100%"> */}
                <InputGroup w="24" ml="2" mr="2">
                  <Input
                    type="number"
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
                  <InputRightElement>
                    <Icon
                      as={CheckIcon}
                      onClick={e => {
                        handleEditIngredient(e);
                        setIsEditIngredient("");
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
                {/* </GridItem>
            <GridItem colSpan={5} w="100%"> */}
                <Text textAlign="left" fontSize="18">
                  ) {ingredient.ingredientUnit}{" "}
                </Text>
              </Flex>
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
                onClick={() =>
                  handleRemoveIngredient(ingredient.ingredientName)
                }
              />
            </GridItem>
          </Grid>
        </Box>
      ) : (
        <Box
          borderColor="green"
          w="100%"
          mb="1"
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
                fontWeight="normal"
                fontSize="18"
                borderColor="green"
                textDecoration={textDecoration}
                justifyContent="left">
                <Checkbox
                  size="lg"
                  h="14"
                  colorScheme="gray"
                  name={ingredient.ingredientName}
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
