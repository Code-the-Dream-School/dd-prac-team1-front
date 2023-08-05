import React, { useState, useEffect } from "react";
import { Center, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import { SavedRecipe } from "../utils/types";
import { getRecipe } from "../utils/fetchData";
import SavedRecipesList from "./SavedRecipesList";
import CategoriesList from "./CategoriesList";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRecipe()
      .then(response => {
        console.log(response.data.recipe);
        setRecipes(response.data.recipe);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const categories = recipes.reduce(
    (acc: Array<string>, recipe: SavedRecipe) => {
      if (!acc.includes(recipe.recipeCategory)) {
        acc.push(recipe.recipeCategory);
      }
      return acc;
    },
    []
  );
  console.log(categories);

  return (
    <Container maxW="7xl">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={1} w="100%" h="100"></GridItem>
        <GridItem colSpan={2} w="100%" h="100">
          <Center h="100">
            <Text fontSize="3xl">SAVED RECIPES</Text>
          </Center>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={1} w="100%">
          {/* <Flex flexDirection="column">
            <Box border="1px" borderBottomStyle="none">
              <Button
                height="55px"
                width="100%"
                variant="link"
                _focus={{
                  fontWeight: "bold",
                  fontStyle: "italic"
                }}>
                SOUPS
              </Button>
            </Box>
            <Box border="1px" borderBottomStyle="none">
              <Button
                height="55px"
                width="100%"
                variant="link"
                _focus={{
                  fontWeight: "bold",
                  fontStyle: "italic"
                }}>
                SALADS
              </Button>
            </Box>
            <Box border="1px" borderBottomStyle="none">
              <Button
                height="55px"
                width="100%"
                variant="link"
                _focus={{
                  fontWeight: "bold",
                  fontStyle: "italic"
                }}>
                DESSERTS
              </Button>
            </Box>
            <Box border="1px">
              <Button
                height="55px"
                width="100%"
                variant="link"
                _focus={{
                  fontWeight: "bold",
                  fontStyle: "italic"
                }}>
                MAIN DISHES
              </Button>
            </Box>
          </Flex> */}
          <CategoriesList categories={categories} />
        </GridItem>
        <GridItem colSpan={2} w="100%">
          <SavedRecipesList recipes={recipes} />
        </GridItem>
      </Grid>
    </Container>
  );
};
export default SavedRecipes;
