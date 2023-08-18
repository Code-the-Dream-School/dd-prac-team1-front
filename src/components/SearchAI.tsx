import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack
} from "@chakra-ui/react";
import { searchAI } from "../utils/fetchData";
import { MultiValue, Select } from "chakra-react-select";
import { AIRecipe } from "../utils/types";
import RecipeAI from "./RecipeAI";
import Loader from "./Loader";

const SearchAI = () => {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [values, setValues] = useState<Array<string>>([]);
  const [recipe, setRecipe] = useState<AIRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  let valuesArray: Array<string> = [];
  const handleSelect = (
    event: MultiValue<{ label: string; value: string }>
  ) => {
    valuesArray = event.map(item => item.value);
    setValues(valuesArray);
  };

  const handleSearch = () => {
    searchAI(search, values)
      .then(response => {
        setRecipe(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        if (error.message.includes("500")) {
          setError(true);
          setIsLoading(false);
          setErrorMessage(
            `${error.response.status} - ${error.response.data.error}`
          );
          setRecipe(null);
          // setSearch("");
        } else {
          setError(true);
          setIsLoading(false);
          setErrorMessage(
            `${error.response.status} - ${error.response.data.msg}`
          );
          setRecipe(null);
          // setSearch("");
        }
      });
  };
  const name = sessionStorage.getItem("username");

  return (
    <Center>
      <Container maxW="6xl">
        <Box
          as="form"
          onSubmit={e => {
            e.preventDefault();
            handleSearch();
            setError(false);
            setIsLoading(true);
          }}>
          <FormControl isInvalid={error}>
            <Flex
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              h="25vh">
              <FormLabel textAlign="center" htmlFor="searchAI">
                Hi {name}, I'm Olivier! Do you want to try a new recipe?
              </FormLabel>
              <Input
                type="text"
                placeholder="Type ingredients or recipe title"
                id="searchAI"
                value={search}
                variant="outline"
                onChange={event => setSearch(event.target.value)}
              />
              {error && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
              <Stack>
                <Select
                  isMulti
                  variant="outline"
                  placeholder="You can select options below"
                  colorScheme="green"
                  options={[
                    { label: "VEGETARIAN", value: "vegetarian" },
                    { label: "VEGAN", value: "vegan" },
                    { label: "GLUTEN FREE", value: "gluten-free" },
                    { label: "DAIRY FREE", value: "dairy-free" },
                    { label: "LOW CALORIE", value: "low-calorie" }
                  ]}
                  onChange={handleSelect}
                />
              </Stack>
              <Center>
                <Button variant="solid" type="submit" isDisabled={isLoading}>
                  GENERATE
                </Button>
              </Center>
            </Flex>
          </FormControl>
        </Box>
        {isLoading ? (
          <Loader text="Olivier is cooking your recipe" />
        ) : (
          recipe && <RecipeAI recipe={recipe} />
        )}
      </Container>
    </Center>
  );
};

export default SearchAI;
