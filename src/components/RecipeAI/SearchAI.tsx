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
  Heading,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import { searchAI } from "../../utils/fetchData";
import { ChakraStylesConfig, MultiValue, Select } from "chakra-react-select";
import { AIRecipe } from "../../utils/types";
import RecipeAI from "./RecipeAI";
import Loader from "./Loader";
import { specialDietsOptions } from "../../utils/OptionsData";

const SearchAI = () => {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [values, setValues] = useState<Array<string>>([]);
  const [recipe, setRecipe] = useState<AIRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (newValue: MultiValue<any>) => {
    let valuesArray = newValue.map(item => item.value);
    setValues(valuesArray);
  };

  const handleSearch = () => {
    searchAI(search, values)
      .then(response => {
        console.log(response);
        if (
          response.data.image === "" ||
          response.data.image.startsWith("https://strapi.pxmo.com") ||
          response.data.image.startsWith("http://www.momsbistro.net")
        ) {
          setRecipe({
            ...response.data,
            image:
              "https://res.cloudinary.com/djidbbhk1/image/upload/v1693072469/default_image_lv6ume.png"
          });
        } else {
          setRecipe(response.data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        if (error.message.includes("500")) {
          setError(true);
          setIsLoading(false);
          setErrorMessage(
            `${error.response.status} - ${error.response.data.error}`
          );
          setRecipe(null);
        } else {
          setError(true);
          setIsLoading(false);
          setErrorMessage(
            `${error?.response?.status || ""} - ${
              error?.response?.data?.msg ||
              error?.response?.data?.message ||
              error?.response?.data?.error ||
              error?.response?.data ||
              error.message ||
              "unknown error"
            }`
          );
          setRecipe(null);
        }
      });
  };
  const name = sessionStorage.getItem("username");

  const chakraStyles: ChakraStylesConfig = {
    menu: provided => ({
      ...provided,
      my: 0,
      borderWidth: "1px",
      borderColor: "green",
      borderRadius: "md"
    }),
    dropdownIndicator: (prev, { selectProps: { menuIsOpen } }) => ({
      ...prev,
      "bg": "green",
      "> svg": {
        transitionDuration: "normal",
        transform: `rotate(${menuIsOpen ? -180 : 0}deg)`
      }
    }),
    multiValue: base => ({
      ...base,
      backgroundColor: "green",
      color: "black",
      borderRadius: "md"
    }),
    option: (base, { isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "green" : "white",
      color: "black",
      cursor: "pointer",
      transition: "background-color 0.2s",
      _hover: {
        backgroundColor: "brandGray"
      }
    })
  };

  return (
    <>
      <Box w="100%" bg="brandGray" mt="5" p="5">
        <Box
          as="form"
          onSubmit={(event: { preventDefault: () => void }) => {
            event.preventDefault();
            handleSearch();
            setError(false);
            setIsLoading(true);
          }}>
          <FormControl isInvalid={error}>
            <Flex flexDirection={"column"} gap="5" alignItems="center">
              <FormLabel textAlign="center" htmlFor="searchAI">
                <Heading size="md">
                  Hi {name}, I'm Olivier! Do you want to try a new recipe?
                </Heading>
              </FormLabel>
              <Input
                w={{ base: "100%", md: "50%" }}
                type="text"
                size="md"
                placeholder="Type ingredients or recipe title"
                id="searchAI"
                value={search}
                focusBorderColor="green"
                variant="outline"
                onChange={event => setSearch(event.target.value)}
              />
              {error && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
              <Stack w={{ base: "100%", md: "50%" }}>
                <Select
                  isMulti
                  chakraStyles={chakraStyles}
                  variant="outline"
                  focusBorderColor="green"
                  placeholder="Select options"
                  options={specialDietsOptions}
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
      </Box>
      <Box p="5">
        {isLoading ? (
          <Loader text="Olivier is cooking your recipe" />
        ) : (
          recipe && <RecipeAI recipe={recipe} />
        )}
      </Box>
    </>
  );
};

export default SearchAI;
