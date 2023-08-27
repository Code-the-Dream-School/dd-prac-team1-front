import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Grid,
  GridItem,
  Text
} from "@chakra-ui/react";
import { SavedRecipe, RecipeTag } from "../../utils/types";
import { getRecipe } from "../../utils/fetchData";
import SavedRecipesList from "./SavedRecipesList";
import CategoriesList from "./CategoriesList";
import { useSearchParams } from "react-router-dom";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState<Array<SavedRecipe>>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Array<SavedRecipe>>(
    []
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [filterAlert, setFilterAlert] = useState<boolean>(false);
  const [activeTag, setActiveTag] = useState("");
  const [show, setShow] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchQueryParam = searchParams.get("search") as string;
  const filteredTag = searchParams.get("filterTag") as string | null;
  const filteredCategory = searchParams.get("filterCategory") as string;

  const handleRecipeSearch = useCallback(
    (searchQueryParam: string, filteredCategory: string) => {
      if (searchQueryParam === null) {
        setFilterAlert(false);
        return;
      }

      const searchedRecipes = recipes.filter((recipe: SavedRecipe) => {
        const searchQueryParamsParsed = searchQueryParam
          .trim()
          .toLowerCase()
          .split(" ");

        const nameMatch = searchQueryParamsParsed.every(item =>
          recipe.recipeName.toLowerCase().includes(item)
        );

        const ingredientMatch = recipe.recipeIngredients.some(ingredient =>
          searchQueryParamsParsed.every(item =>
            ingredient.ingredientName.toLowerCase().includes(item)
          )
        );

        const tagMatch = recipe.recipeTags.some(tag => {
          const tagWords = tag.tagName.toLowerCase().split(" ");
          return searchQueryParamsParsed.every(item => tagWords.includes(item));
        });

        return nameMatch || ingredientMatch || tagMatch;
      });

      if (filteredCategory) {
        setActiveCategory(filteredCategory);
        const filteredCategorizedRecipes = searchedRecipes.filter(
          (recipe: SavedRecipe) => recipe.recipeCategory === filteredCategory
        );
        setFilteredRecipes(filteredCategorizedRecipes);
        setFilterAlert(true);
      } else {
        setFilteredRecipes(searchedRecipes);
        setActiveCategory("");
      }
      setActiveTag("");
      setShow(searchedRecipes.length > 0);
    },
    [recipes]
  );

  useEffect(() => {
    getRecipe()
      .then(response => {
        setRecipes(response.data.recipes);
        setFilteredRecipes(response.data.recipes);
        setIsLoading(false);
        if (filteredTag) {
          setFilterAlert(false);
          setActiveTag(filteredTag);
        }
        if (filteredCategory) {
          setActiveCategory(filteredCategory);
          setFilteredRecipes(
            response.data.recipes.filter(
              (recipe: SavedRecipe) =>
                recipe.recipeCategory === filteredCategory
            )
          );
        }
        if (searchQueryParam) {
          setFilteredRecipes(
            response.data.recipes.filter(
              (recipe: SavedRecipe) =>
                recipe.recipeCategory === filteredCategory
            )
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQueryParam]);

  useEffect(() => {
    if (searchQueryParam || filteredCategory) {
      handleRecipeSearch(searchQueryParam, filteredCategory);
    }
  }, [searchQueryParam, recipes, handleRecipeSearch, filteredCategory]);

  const chooseCategory = useCallback(
    (category: string) => {
      if (searchQueryParam) {
        const filteredCategorizedRecipes = filteredRecipes.filter(
          (recipe: SavedRecipe) => recipe.recipeCategory === category
        );
        const existingSearchParams = new URLSearchParams(
          searchParams.toString()
        );
        existingSearchParams.set("filterCategory", category);
        setSearchParams(existingSearchParams);
        setFilteredRecipes(filteredCategorizedRecipes);
      } else {
        setSearchParams({ ...searchParams, filterCategory: category });
        const categorizedRecipes = recipes.filter(
          (recipe: SavedRecipe) => recipe.recipeCategory === category
        );
        setFilteredRecipes(categorizedRecipes);
      }
      setActiveCategory(category);
      setShow(true);
      setActiveTag("");
    },
    [filteredRecipes, searchParams, recipes, searchQueryParam, setSearchParams]
  );

  const filteredByTag = recipes.filter((recipe: SavedRecipe) => {
    return (
      recipe.recipeTags.some(
        (tag: RecipeTag) => tag.tagName.toLocaleLowerCase() === activeTag
      ) ||
      recipe.recipeSpecialDiets.some(
        (diet: string) => diet.toLocaleLowerCase() === activeTag
      )
    );
  });

  const showAllCategories = () => {
    setShow(true);
    setFilterAlert(false);
    setFilteredRecipes(recipes);
    setActiveCategory("");
    setActiveTag("");
    setSearchParams({});
    setFilterAlert(false);
  };

  const categories = recipes.reduce(
    (acc: Array<string>, recipe: SavedRecipe) => {
      if (!acc.includes(recipe.recipeCategory)) {
        acc.push(recipe.recipeCategory);
      }
      return acc;
    },
    []
  );

  const tags = recipes.reduce((acc: Array<string>, recipe: SavedRecipe) => {
    recipe.recipeTags.forEach((tag: RecipeTag) => {
      if (
        !acc.includes(tag.tagName.toLocaleLowerCase()) &&
        !tag.tagName.includes("--")
      ) {
        acc.push(tag.tagName.toLocaleLowerCase());
      }
    });
    return acc;
  }, []);

  const diets = recipes.reduce((acc: Array<string>, recipe: SavedRecipe) => {
    recipe.recipeSpecialDiets.forEach((diet: string) => {
      if (!acc.includes(diet.toLocaleLowerCase())) {
        acc.push(diet.toLocaleLowerCase());
      }
    });
    return acc;
  }, []);

  const tagsAndDiets = [...tags, ...diets].reduce(
    (acc: Array<string>, item: string) => {
      if (!acc.includes(item) && item !== "none") {
        acc.push(item.toLocaleLowerCase());
      }
      return acc.sort();
    },
    []
  );

  return (
    <Container maxW="7xl">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
<<<<<<< HEAD
        <GridItem colSpan={1} w="100%" h="100"></GridItem>
        <GridItem colSpan={2} w="100%" h="100">
          <Center h="100">
            <Heading fontSize="3xl">SAVED RECIPES</Heading>
=======
        <GridItem colSpan={1} w="100%" h="70"></GridItem>
        <GridItem colSpan={2} w="100%" h="70">
          <Center h="150">
            <Text fontSize="3xl">SAVED RECIPES</Text>
>>>>>>> 9c679af709b648ef5d00b855e0b48d195121d87a
          </Center>
        </GridItem>
        <GridItem colSpan={1} w="100%" h="55">
          {filterAlert && (
            <Box>
              <Heading as="h5" size="sm" mb="3">
                You may have "{searchQueryParam}" in these categories:
              </Heading>
              <Text fontSize="xs">
                Press "all categories" to filter through all recipes again.
              </Text>
            </Box>
          )}
        </GridItem>
        <GridItem colSpan={2}></GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        <GridItem colSpan={1} w="100%" mt="3">
          <Flex flexDirection="column">
            <CategoriesList
              categories={categories}
              chooseCategory={chooseCategory}
              chooseAllCategories={showAllCategories}
              activeCategory={activeCategory}
            />
          </Flex>
          <Flex flexDirection="column" marginTop="5">
            <Box as="span">
              {tagsAndDiets.map(tag => (
                <Button
                  size="sm"
                  variant={activeTag === tag ? "solid" : "outline"}
                  margin="1"
                  key={tag}
                  onClick={() => {
                    setActiveTag(tag);
                    setActiveCategory("");
                    setSearchParams({ filterTag: tag });
                  }}>
                  {tag}
                </Button>
              ))}
            </Box>
          </Flex>
        </GridItem>
        {show || isLoading ? (
          <GridItem colSpan={2} w="100%">
            {searchQueryParam &&
            activeCategory &&
            filteredRecipes.length === 0 ? (
              <Center h="300">
                <Text fontSize="3xl">
                  No results for "{searchQueryParam}" in the "{activeCategory}"
                  category
                </Text>
              </Center>
            ) : (
              <>
                {activeTag ? (
                  <SavedRecipesList recipes={filteredByTag} />
                ) : (
                  <SavedRecipesList recipes={filteredRecipes} />
                )}
              </>
            )}
          </GridItem>
        ) : (
          <GridItem
            colSpan={2}
            w="100%"
            textAlign="center"
            alignItems="center"
            h="10rem">
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
