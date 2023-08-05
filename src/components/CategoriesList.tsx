import React from "react";
import { Flex } from "@chakra-ui/react";
import CategoriesItem from "./CategoriesItem";

type CategoriesProps = { categories: Array<string> };

const CategoriesList = ({ categories }: CategoriesProps) => {
  return (
    <Flex flexDirection="column">
      {categories.map(category => (
        <CategoriesItem key={category} category={category} />
      ))}
    </Flex>
  );
};

export default CategoriesList;
