import { Container, Flex } from "@chakra-ui/react";
import CategoriesItem from "./CategoriesItem";


type CategoriesProps = { 
  categories: Array<string>,
  chooseCategory: Function,
  chooseAllCategories: Function
};

const CategoriesList = ({ categories, chooseCategory, chooseAllCategories }: CategoriesProps) => {
  return (
    <Container>
      <Flex flexDirection="column">
        <CategoriesItem handleClick={chooseAllCategories} title="All recipes"/>
        {categories.map(category => (
          <CategoriesItem key={category} category={category} title={category} handleClick={chooseCategory} />
        ))}
      </Flex>
    </Container>
  );
};

export default CategoriesList;
