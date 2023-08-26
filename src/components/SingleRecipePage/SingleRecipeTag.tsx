import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type SingleRecipeTagProps = { tag: string };

const SingleRecipeTag = ({ tag }: SingleRecipeTagProps) => {
  const navigate = useNavigate();

  const navigateToFilteredTag = () => {
    const filterByTag = `${tag}`;
    navigate(`/saved-recipes?filterTag=${filterByTag}`);
  };

  return (
    <Button
      size="sm"
      margin="1"
      onClick={() => {
        navigateToFilteredTag();
      }}>
      {tag}
    </Button>
  );
};
export default SingleRecipeTag;
