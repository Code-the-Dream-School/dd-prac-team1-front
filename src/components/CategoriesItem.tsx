import React from "react";
import { Box, Button } from "@chakra-ui/react";

type CategoriesItemProps = { category: string };

const CategoriesItem = ({ category }: CategoriesItemProps) => {
  return (
    <Box border="1px" marginTop="-1px">
      <Button
        height="55px"
        width="100%"
        variant="link"
        type="button"
        title="category"
        _focus={{
          fontWeight: "bold",
          fontStyle: "italic"
        }}>
        {category}
      </Button>
    </Box>
  );
};
export default CategoriesItem;
