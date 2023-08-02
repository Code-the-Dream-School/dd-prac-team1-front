import { useState } from "react";
import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { searchAI } from "../utils/fetchData";
import { MultiValue, Select } from "chakra-react-select";
import { useLocation } from "react-router-dom";

const SearchAI = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState("");

  const location = useLocation();

  let valuesSearch = "";

  const handleSelect = (event: MultiValue<{ label: string; value: string; }>) => {
    for (let i=0; i<event.length; i++){
      valuesSearch += `${event[i].value} `
    }
    console.log(valuesSearch)
    setValues(valuesSearch)
  }

  const handleSearch = () => {
    const searchWithOptions = search.concat(" ",values)
    console.log(searchWithOptions)
    searchAI(searchWithOptions)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        if (error.message.includes("500")){
          setError(true)
          setErrorMessage(`${error.response.status} - ${error.response.data.error}`)
        } else {
          setError(true)
          setErrorMessage(`${error.response.status} - ${error.response.data.msg}`)
        } 
      });
  };

  return (
    <Center h="100vh">
      <Container maxW="xl">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSearch();
          }}>
          <FormControl isInvalid={error}>
            <Flex flexDirection={"column"} justifyContent={"space-evenly"}  h="40vh">
            <FormLabel textAlign="center" htmlFor="searchAI">Hi {location.state.username}, I'm Olivier! Do you want to try a new recipe?</FormLabel> 
            <Input
              type="text"
              placeholder="Type ingredients or recipe title"
              id="searchAI"
              value={search}
              variant="flushed"
              onChange={event => setSearch(event.target.value)}
            />
            {error && (
              <FormErrorMessage>
                {errorMessage}
              </FormErrorMessage>
            )}
            <Stack>
              <Select 
                isMulti
                closeMenuOnSelect={false}
                variant='outline' 
                placeholder='You can select options below'
                colorScheme="green"
                options={
                  [
                    { label: 'VEGETARIAN', value: 'vegetarian'},
                    { label: 'VEGAN', value: 'vegan' },
                    { label: 'GLUTEN FREE', value: 'gluten-free' },
                    { label: 'DAIRY FREE', value: 'dairy-free' },
                    { label: 'LOW CALORIE', value: 'low-calorie' },
                  ]
                }
                onChange={handleSelect}
              />  
            </Stack>
            <Center>
              <Button
                variant="solid"
                type="submit"
                title="search recipe with AI">
                Search
              </Button>
            </Center>
            </Flex>
          </FormControl>
        </form>
      </Container>
    </Center>
  );
};

export default SearchAI;