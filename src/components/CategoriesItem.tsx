import React from "react";
import { Button } from "@chakra-ui/react";

type CategoriesItemProps = { category: string };

const CategoriesItem = ({ category }: CategoriesItemProps) => {
  return (
    <Button
      height="55px"
      width="100%"
      variant="link"
      _focus={{
        fontWeight: "bold",
        fontStyle: "italic"
      }}
      borderRadius="0"
      border="1px"
      marginTop="-1px">
      {category}
    </Button>
  );
};
export default CategoriesItem;
