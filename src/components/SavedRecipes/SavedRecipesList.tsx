import React from "react";
import { Grid } from "@chakra-ui/react";
import { SavedRecipe } from "../../utils/types";
import SavedRecipesItem from "./SavedRecipesItem";

type SavedRecipesProps = {
  recipes: Array<SavedRecipe>;
};

const SavedRecipesList = ({ recipes }: SavedRecipesProps) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)"
      }}
      justifyItems="center"
      gap={3}>
      {recipes.map(recipe => (
        <SavedRecipesItem key={recipe._id} recipe={recipe} />
      ))}
    </Grid>
  );
};
export default SavedRecipesList;
