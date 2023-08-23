import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Icon,
  IconButton,
  Flex,
  Grid,
  GridItem,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { GiPencil } from "react-icons/gi";
import { GrAdd, GrClose, GrDown } from "react-icons/gr";
import { TfiPrinter } from "react-icons/tfi";
import { getIngredientsFromShoppingList } from "../../utils/fetchData";
import { SavedIngredient } from "../../utils/types";
import ModalForNewIngredient from "./ModalForNewIngredient";

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<Array<SavedIngredient>>([]);
  const [newIngredientName, setNewIngredientName] = useState<string>("");
  const [newIngredientAmount, setNewIngredientAmount] = useState<number>(0);
  const [newIngredientUnit, setNewIngredientUnit] = useState<string>("");
  const [uncheckedIds, setUncheckedIds] = useState<Array<string>>([]);
  const [checkedIds, setCheckedIds] = useState<Array<string>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    getIngredientsFromShoppingList()
      .then(response => {
        console.log(response);
        setIngredients(response.data.ingredients);
        // setUncheckedIds(response.data.ingredients._id);
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleIngredientAdd = () => {
    setIngredients([
      ...ingredients,
      {
        ingredientName: newIngredientName,
        ingredientAmount: newIngredientAmount,
        ingredientUnit: newIngredientUnit
      }
    ]);
    onClose();
  };
  console.log(ingredients);
  console.log(checkedIds);
  const handleNewIngredientName = (e: any) => {
    setNewIngredientName(e.target.value);
  };
  const handleNewIngredientAmount = (e: any) => {
    setNewIngredientAmount(Number(e.target.value));
  };
  const handleNewIngredientUnit = (e: any) => {
    setNewIngredientUnit(e.target.value);
  };
  //if (ingredients === undefined) return;

  const checkedIngredients = ingredients.filter(ingredient => {
    return checkedIds.includes(ingredient._id);
  });

  const uncheckedIngredients = ingredients.filter(ingredient => {
    return !checkedIds.includes(ingredient._id);
  });

  console.log(checkedIngredients);
  console.log(uncheckedIngredients);
  // const filteredByTag = recipes.filter((recipe: SavedRecipe) => {
  //   return recipe.recipeTags.some(
  //     (tag: RecipeTag) => tag.tagName === activeTag
  //   );
  // });
  const print = () => {
    window.print();
  };
  console.log(ingredients);
  return (
    <Container maxW="3xl">
      <Grid
        templateColumns="repeat(12, 1fr)"
        gap="2"
        h="20"
        alignItems="center">
        <GridItem colSpan={2} w="100%" mt="5"></GridItem>
        <GridItem colSpan={8} w="100%">
          <Text fontSize="2xl">Shopping list</Text>
        </GridItem>
        <GridItem colSpan={1} w="100%" mt="5">
          <Button variant="outline" bg="white">
            Share
          </Button>
        </GridItem>
        <GridItem colSpan={1} w="100%" mt="5">
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="Print recipe"
            icon={<TfiPrinter />}
            title="print"
            onClick={print}
          />
        </GridItem>
      </Grid>

      <Button variant="outline" w="100%" m="1" bg="white" onClick={onOpen}>
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap="2"
          alignItems="center"
          w="100%">
          <GridItem colSpan={1} w="100%">
            <Icon as={GrAdd} />
          </GridItem>
          <GridItem colSpan={11} w="100%">
            <Text color="gray" fontWeight="normal" textAlign="left">
              ADD ITEM
            </Text>
          </GridItem>
        </Grid>
      </Button>

      {uncheckedIngredients.map(ingredient => (
        <Box key={ingredient._id}>
          <ModalForNewIngredient
            isOpen={isOpen}
            newIngredientName={newIngredientName}
            newIngredientAmount={newIngredientAmount}
            newIngredientUnit={newIngredientUnit}
            handleNewIngredientName={handleNewIngredientName}
            handleNewIngredientAmount={handleNewIngredientAmount}
            handleNewIngredientUnit={handleNewIngredientUnit}
            handleIngredientAdd={handleIngredientAdd}
            onClose={() => {
              onClose();
            }}
          />
          <Button
            variant="outline"
            w="100%"
            m="1"
            bg="white"
            borderColor="green">
            <Grid
              templateColumns="repeat(12, 1fr)"
              w="100%"
              gap="2"
              // m="5"
              alignItems="center">
              <GridItem colSpan={1} w="100%">
                <Checkbox
                  size="lg"
                  colorScheme="gray"
                  id={ingredient._id}
                  onChange={e => {
                    console.log(e);
                    if (e.target.checked) {
                      setCheckedIds(prevIds => [...prevIds, e.target.id]);
                    }
                  }}
                />
              </GridItem>
              <GridItem colSpan={9} w="100%">
                <Flex>
                  {`${ingredient.ingredientName} (${ingredient.ingredientAmount} ${ingredient.ingredientUnit})`}
                </Flex>
              </GridItem>
              <GridItem colSpan={1} w="100%" p="2">
                <Icon as={GiPencil} />
              </GridItem>
              <GridItem colSpan={1} w="100%" p="2">
                <Icon as={GrClose} />
              </GridItem>
            </Grid>
          </Button>
        </Box>
      ))}
      <Button variant="outline" w="100%" m="1" bg="white">
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap="2"
          alignItems="center"
          w="100%">
          <GridItem colSpan={1} w="100%">
            <Icon as={GrDown} />
          </GridItem>
          <GridItem colSpan={10} w="100%">
            <Text color="gray" fontWeight="normal" textAlign="left">
              CHECKED ITEMS
            </Text>
          </GridItem>
          <GridItem colSpan={1} w="100%">
            <Box
              as="div"
              h="7"
              bg="lightgray"
              w="20"
              borderRadius="5"
              textColor="gray">
              <Flex alignItems="center">
                <Icon as={GrClose} ml="1" color="grey" />
                <Text m="1">Clear</Text>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </Button>
      {checkedIngredients.map(ingredient => (
        <Box key={ingredient._id}>
          <ModalForNewIngredient
            isOpen={isOpen}
            newIngredientName={newIngredientName}
            newIngredientAmount={newIngredientAmount}
            newIngredientUnit={newIngredientUnit}
            handleNewIngredientName={handleNewIngredientName}
            handleNewIngredientAmount={handleNewIngredientAmount}
            handleNewIngredientUnit={handleNewIngredientUnit}
            handleIngredientAdd={handleIngredientAdd}
            onClose={() => {
              onClose();
            }}
          />
          <Button
            variant="outline"
            w="100%"
            m="1"
            bg="white"
            borderColor="green">
            <Grid
              templateColumns="repeat(12, 1fr)"
              w="100%"
              gap="2"
              // m="5"
              alignItems="center">
              <GridItem colSpan={1} w="100%">
                <Checkbox
                  size="lg"
                  colorScheme="gray"
                  defaultChecked
                  id={ingredient._id}
                  onChange={e => {
                    console.log(e);
                    if (!e.target.checked) {
                      const updateId = checkedIds.filter(id => {
                        return id !== ingredient._id;
                      });
                      return setCheckedIds(updateId);
                      //   setCheckedIds(prevIds => [...prevIds, e.target.id]);
                    }
                  }}
                />
              </GridItem>
              <GridItem colSpan={9} w="100%">
                <Flex>
                  {`${ingredient.ingredientName} (${ingredient.ingredientAmount} ${ingredient.ingredientUnit})`}
                </Flex>
              </GridItem>
              <GridItem colSpan={1} w="100%" p="2">
                <Icon as={GiPencil} />
              </GridItem>
              <GridItem colSpan={1} w="100%" p="2">
                <Icon as={GrClose} />
              </GridItem>
            </Grid>
          </Button>
        </Box>
      ))}
    </Container>
  );
};

export default ShoppingList;
