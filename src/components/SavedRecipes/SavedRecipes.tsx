import React, { useState, useEffect, useCallback } from "react";
import {
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Text
} from "@chakra-ui/react";
import { SavedRecipe } from "../../utils/types";
import { getRecipe } from "../../utils/fetchData";
import SavedRecipesList from "./SavedRecipesList";
import CategoriesList from "./CategoriesList";
import { useSearchParams } from "react-router-dom";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const searchQueryParam = searchParams.get("search");

  useEffect(() => {
    getRecipe()
      .then(response => {
        console.log(response.data.recipes);
        setRecipes(response.data.recipes);
        setFilteredRecipes(response.data.recipes);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleRecipeSearch = useCallback(
    (searchQueryParam: string) => {
      const searchedRecipes = recipes.filter((recipe: SavedRecipe) => {
        const searchQueryParamParsed = searchQueryParam.toLowerCase();
        const nameSearch = recipe.recipeName.toLowerCase();
        const ingredientSearch = recipe.recipeIngredients.map(ingredient => {
          return ingredient.ingredientName.toLowerCase();
        });
        const tagSearch = recipe.recipeTags.map(tag => {
          return tag.tagName.toLowerCase();
        });
        return (
          nameSearch.includes(searchQueryParamParsed) ||
          ingredientSearch.includes(searchQueryParamParsed) ||
          tagSearch.includes(searchQueryParamParsed)
        );
      });
      if (searchedRecipes.length > 0) {
        setFilteredRecipes(searchedRecipes);
        setShow(true);
      } else if (!searchedRecipes.length) {
        setShow(false);
      }
    },
    [recipes]
  );

  useEffect(() => {
    if (searchQueryParam) {
      handleRecipeSearch(searchQueryParam);
    } else {
      setSearchParams({ search: "" });
    }
  }, [searchQueryParam, recipes, handleRecipeSearch, setSearchParams]);

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
    const categorizedRecipes = recipes.filter(
      (recipe: SavedRecipe) => recipe.recipeCategory === category
    );
    setShow(true);
    setFilteredRecipes(categorizedRecipes);
  };

  const showAllCategories = () => {
    setShow(true);
    setFilteredRecipes(recipes);
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
            <CategoriesList
              categories={categories}
              chooseCategory={chooseCategory}
              chooseAllCategories={showAllCategories}
            />
          </Flex>
        </GridItem>
        {show || isLoading ? (
          <GridItem colSpan={2} w="100%">
            <SavedRecipesList recipes={filteredRecipes} />
          </GridItem>
        ) : (
          <GridItem
            colSpan={2}
            w="100%"
            textAlign="center"
            alignItems={"center"}
            h={"10rem"}>
            <Center h="300">
              <Text fontSize="3xl">No results for "{searchQueryParam}"</Text>
            </Center>
          </GridItem>
        )}
      </Grid>
    </Container>
  );
};
export default SavedRecipes;
