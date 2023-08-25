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
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const searchQueryParam = searchParams.get("search") as string | null;
  const filteredTag = searchParams.get("filterTag") as string | null;
  const filteredCategory = searchParams.get("filterCategory") as string | null;

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
        setActiveTag("");
        setActiveCategory("");
        setShow(true);
      } else if (!searchedRecipes.length) {
        setShow(false);
      }
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
    if (searchQueryParam) {
      handleRecipeSearch(searchQueryParam);
    }
  }, [searchQueryParam, recipes, handleRecipeSearch, setSearchParams]);

  const chooseCategory = (category: string) => {
    const categorizedRecipes = recipes.filter(
      (recipe: SavedRecipe) => recipe.recipeCategory === category
    );
    setShow(true);
    setFilteredRecipes(categorizedRecipes);
    setActiveCategory(category);
    setActiveTag("");
    setSearchParams({ filterCategory: category });
  };

  const filteredByTag = recipes.filter((recipe: SavedRecipe) => {
    return recipe.recipeTags.some(
      (tag: RecipeTag) => tag.tagName === activeTag
    );
    // || recipe.recipeSpecialDiets.some((diet: any ) => diet.dietName === activeTag)
  });

  const showAllCategories = () => {
    setShow(true);
    setFilteredRecipes(recipes);
    setActiveCategory("");
    setActiveTag("");
    setSearchParams({});
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
      if (!acc.includes(tag.tagName) && !tag.tagName.includes("--")) {
        acc.push(tag.tagName);
      }
    });
    return acc;
  }, []);
  console.log(tags);
  const diets = recipes.reduce((acc: Array<string>, recipe: SavedRecipe) => {
    recipe.recipeSpecialDiets.forEach((diet: string) => {
      if (!acc.includes(diet)) {
        acc.push(diet);
      }
    });
    return acc;
  }, []);
  console.log(diets);

  const tagsAndDiets = [...tags, ...diets];
  console.log(tagsAndDiets);

  // const tags = recipes.reduce((acc: Array<string>, recipe: SavedRecipe) => {
  // recipe.recipeTags.forEach((tag: RecipeTag) => {
  //   if (!acc.includes(tag.tagName) && !tag.tagName.includes("--")) {
  //     acc.push(tag.tagName.toLowerCase());
  //   }
  // });
  // recipe.recipeSpecialDiets.forEach((diet: string) => {
  //   if (!acc.includes(diet)) {
  //     acc.push(diet);
  //   }
  // });
  //   return acc;
  // }, []);
  // const tags = recipes.map((recipe: SavedRecipe) => {

  //   recipe.recipeTags.map(tag =>
  //      const renderingTags: string[] = [];
  //     renderingTags.push(tag.tagName.toLocaleLowerCase())
  //   );
  //   recipe.recipeSpecialDiets.map(diet => {
  //     if (diet !== "None") {
  //       renderingTags.push(diet.toLocaleLowerCase());
  //     }
  //   });
  //   return renderingTags;
  // });

  // const removeDuplicates = (renderingTags: any[]) => {
  //   return renderingTags.filter(
  //     (tag: any, index: any) => renderingTags.indexOf(tag) === index
  //   );
  // };
  // return renderingTags;
  // };

  // return removeDuplicates(renderingTags);
  // }, []);

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
              activeCategory={activeCategory}
            />
          </Flex>
          <Flex flexDirection="column" marginTop="5">
            <Heading as="h3" size="md" marginBottom="3">
              Tags
            </Heading>
            <Box as="span">
              {tags.map(tag => (
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
            {activeTag ? (
              <SavedRecipesList recipes={filteredByTag} />
            ) : (
              <SavedRecipesList recipes={filteredRecipes} />
            )}
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
