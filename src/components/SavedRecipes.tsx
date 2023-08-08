import React, { useState, useEffect } from "react";
import { Center, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { SavedRecipe } from "../utils/types";
import { getRecipe } from "../utils/fetchData";
import SavedRecipesList from "./SavedRecipesList";
import CategoriesList from "./CategoriesList";
//import { useLocation, useSearchParams } from "react-router-dom";
//import { useLocation } from "react-router-dom";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
 
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

   //MESSING WITH THE PARAMS

  //let [searchParams, setSearchParams] = useSearchParams();
   //const params = searchParams.get("search");
  //console.log(params)


  //const { search } = useLocation();
  //const searchParams = new URLSearchParams(search);
  //console.log(searchParams)

/*const [searchParams, setSearchParams] = useSearchParams();
useEffect(() => {
  const currentParams = Object.fromEntries([...searchParams]);
  onsole.log(currentParams)
}, [searchParams]);
*/


//THE PART WITH SENDING STATE TO SAVEDRECIPES
//  const location = useLocation()
/*const searchItem = location.state.search;


  const handleRecipeSearch = (searchItem) => {
    console.log("I am running in handleSearch")
    const searchedRecipes = recipes.filter((recipe: SavedRecipe) => {
        const search = searchItem.toLowerCase();
        const nameSearch = recipe.recipeName.toLowerCase()
        const ingredientSearch = recipe.recipeIngredients.map(ingredient => {
            return ingredient.ingredientName.toLowerCase()
        })
        const tagSearch = recipe.recipeTags.map(tag => {
            return tag.tagName.toLowerCase();
        })

        return nameSearch.includes(search) || ingredientSearch.includes(search) || tagSearch.includes(search)
    })
    setFilteredRecipes(searchedRecipes)
}

  useEffect(() => {
    console.log("I am running in useeffect")
    handleRecipeSearch(searchItem)
  }, [searchItem])
*/

  return (
    <Container maxW="7xl">
      {/* <RecipeSearch handleRecipeSearch={handleRecipeSearch}/> */}
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

