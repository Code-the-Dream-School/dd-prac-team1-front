import React, { useState, useEffect } from "react";
import { Center, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { SavedRecipe } from "../utils/types";
import { getRecipe } from "../utils/fetchData";
import SavedRecipesList from "./SavedRecipesList";
import CategoriesList from "./CategoriesList";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    getRecipe()
      .then(response => {
        console.log(response.data.recipe);
        setRecipes(response.data.recipe);
        setFilteredRecipes(response.data.recipe);
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

  const chooseCategory = (category: string) => {
    const categorizedRecipes = recipes.filter((recipe: SavedRecipe)=> recipe.recipeCategory === category)
    setFilteredRecipes(categorizedRecipes)
  };

  const showAllCategories = () => {
    setFilteredRecipes(recipes)
  };

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
          <Flex flexDirection="column">
            <CategoriesList categories={categories} chooseCategory={chooseCategory} chooseAllCategories={showAllCategories}/>
          </Flex>
        </GridItem>
        <GridItem colSpan={2} w="100%">
          <SavedRecipesList recipes={filteredRecipes} />
        </GridItem> 
      </Grid>
    </Container>
  );
};
export default SavedRecipes;
