import React from "react";
import { Button } from "@chakra-ui/react";
import { RecipeTag } from "../../utils/types";
import { useNavigate } from "react-router-dom";

type SingleRecipeTagProps = { tag: RecipeTag };

const SingleRecipeTag = ({ tag }: SingleRecipeTagProps) => {
  const navigate = useNavigate();

  const navigateToFilteredTag = () => {
    const filterByTag = `${tag.tagName}`;
    navigate(`/saved-recipes?filterTag=${filterByTag}`);
  };

  return (
    <Button
      size="sm"
      margin="1"
      onClick={() => {
        navigateToFilteredTag();
      }}>
      {tag.tagName}
    </Button>
  );
};
export default SingleRecipeTag;
