import React from "react";
import { Grid } from "@chakra-ui/react";
import { SavedRecipe } from "../utils/types";
import SavedRecipesItem from "./SavedRecipesItem";

type SavedRecipesProps = {
  recipes: Array<SavedRecipe>;
  // setSearchParams: Function;
};

const SavedRecipesList = ({
  recipes
}: // setSearchParams
SavedRecipesProps) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={3}>
      {recipes.map(recipe => (
        <SavedRecipesItem
          key={recipe._id}
          recipe={recipe}
          // setSearchParams={setSearchParams}
        />
      ))}
    </Grid>
  );
};
export default SavedRecipesList;
