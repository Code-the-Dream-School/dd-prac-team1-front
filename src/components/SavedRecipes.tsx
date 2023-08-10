import React, { useState, useEffect } from "react";
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
import { SavedRecipe, RecipeTag } from "../utils/types";
import { getRecipe } from "../utils/fetchData";
import SavedRecipesList from "./SavedRecipesList";
import CategoriesList from "./CategoriesList";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [activeTagFromRecipe, setActiveTagFromRecipe] = useState(
    localStorage.getItem("filteredTag")
  );

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
    const categorizedRecipes = recipes.filter(
      (recipe: SavedRecipe) => recipe.recipeCategory === category
    );
    setFilteredRecipes(categorizedRecipes);
    setActiveCategory(category);
    setActiveTag("");
    setActiveTagFromRecipe("");
    localStorage.removeItem("filteredTag");
  };

  const tags = recipes.reduce((acc: Array<string>, recipe: SavedRecipe) => {
    recipe.recipeTags.forEach((tag: RecipeTag) => {
      if (!acc.includes(tag.tagName) && !tag.tagName.includes("--")) {
        acc.push(tag.tagName);
      }
    });
    return acc;
  }, []);
  const tagClickedInRecipe = localStorage.getItem("filteredTag");
  console.log(tagClickedInRecipe);

  const filteredByTag = recipes.filter((recipe: SavedRecipe) => {
    return recipe.recipeTags.some((tag: RecipeTag) => {
      if (tag.tagName === activeTag) return tag.tagName;
      if (tag.tagName === tagClickedInRecipe) return tag.tagName;
    });
  });

  console.log(filteredByTag);
  const showAllCategories = () => {
    setFilteredRecipes(recipes);
    setActiveCategory("");
    setActiveTag("");
    setActiveTagFromRecipe("");
    localStorage.removeItem("filteredTag");
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
                    localStorage.removeItem("filteredTag");
                  }}>
                  {tag}
                </Button>
              ))}
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={2} w="100%">
          {activeTagFromRecipe ? (
            <SavedRecipesList recipes={filteredByTag} />
          ) : activeTag ? (
            <SavedRecipesList recipes={filteredByTag} />
          ) : (
            <SavedRecipesList recipes={filteredRecipes} />
          )}
        </GridItem>
      </Grid>
    </Container>
  );
};
export default SavedRecipes;
