import React from "react";
import { Button } from "@chakra-ui/react";
import { RecipeTag } from "../../utils/types";

type SingleRecipeTagProps = { tag: RecipeTag };

const SingleRecipeTag = ({ tag }: SingleRecipeTagProps) => {
  return (
    <Button size="sm" margin="1">
      {tag.tagName}
    </Button>
  );
};
export default SingleRecipeTag;
