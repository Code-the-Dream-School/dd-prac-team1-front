import React from "react";
import { Button } from "@chakra-ui/react";

type CategoriesItemProps = {
  category?: string;
  title: string;
  handleClick: Function;
  active: boolean;
};

const CategoriesItem = ({
  category,
  title,
  handleClick,
  active
}: CategoriesItemProps) => {
  return (
    <Button
      height="55px"
      width="100%"
      variant={active ? "solid" : "outline"}
      borderRadius="0"
      border="1px"
      mt="-1px"
      textDecoration="none"
      onClick={() => handleClick(category)}>
      {title}
    </Button>
  );
};
export default CategoriesItem;
