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
      variant={active ? "solid" : "link"}
      borderRadius="0"
      border="1px"
      marginTop="-1px"
      onClick={() => handleClick(category)}>
      {title}
    </Button>
  );
};
export default CategoriesItem;
