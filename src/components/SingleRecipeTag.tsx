import React from "react";
import { Button } from "@chakra-ui/react";
import { RecipeTag } from "../utils/types";
import { useNavigate } from "react-router-dom";

type SingleRecipeTagProps = { tag: RecipeTag };

const SingleRecipeTag = ({ tag }: SingleRecipeTagProps) => {
  const navigate = useNavigate();

  const navigateToSavedRecipe = () => {
    const filterByTag = `${tag.tagName}`;
    navigate(`/saved-recipes?filter=${filterByTag}`);
  };

  return (
    <Button
      size="sm"
      margin="1"
      onClick={() => {
        navigateToSavedRecipe();
      }}>
      {tag.tagName}
    </Button>
  );
};
export default SingleRecipeTag;
