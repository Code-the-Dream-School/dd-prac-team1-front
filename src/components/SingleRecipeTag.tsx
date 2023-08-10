import React from "react";
import { Button } from "@chakra-ui/react";
import { RecipeTag } from "../utils/types";
import { useNavigate } from "react-router-dom";

type SingleRecipeTagProps = { tag: RecipeTag };

const SingleRecipeTag = ({ tag }: SingleRecipeTagProps) => {
  const navigate = useNavigate();
  const navigateToSavedRecipe = () => {
    navigate("/saved-recipes");
  };

  return (
    <Button
      size="sm"
      margin="1"
      onClick={() => {
        localStorage.setItem("filteredTag", tag.tagName);
        navigateToSavedRecipe();
      }}>
      {tag.tagName}
    </Button>
  );
};
export default SingleRecipeTag;
