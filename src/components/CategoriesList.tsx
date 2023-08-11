import { Flex } from "@chakra-ui/react";
import CategoriesItem from "./CategoriesItem";

type CategoriesProps = {
  categories: Array<string>;
  chooseCategory: Function;
  chooseAllCategories: Function;
  activeCategory: string;
};

const CategoriesList = ({
  categories,
  chooseCategory,
  chooseAllCategories,
  activeCategory
}: CategoriesProps) => {
  return (
    <Flex flexDirection="column">
      <CategoriesItem
        handleClick={chooseAllCategories}
        title="All recipes"
        active={activeCategory === ""}
      />
      {categories.map(category => (
        <CategoriesItem
          key={category}
          category={category}
          title={category}
          handleClick={chooseCategory}
          active={activeCategory === category}
        />
      ))}
    </Flex>
  );
};

export default CategoriesList;
