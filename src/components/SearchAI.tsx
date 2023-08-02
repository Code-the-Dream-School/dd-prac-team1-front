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
  const [selectOptions, setSelectOptions] = useState<string[]>([]);

  
  const handleSearch = () => {
    searchAI(search, selectOptions)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        if (error.message.includes("500")){
          setError(true)
          setErrorMessage(error.response.data.error)
        } else {
          setError(true)
          setErrorMessage(error.response.data.msg)
        } 
      });
  };

  const location = useLocation()

  const handleSelect = (event: MultiValue<{ label: string; value: string; }>) => {
    const valuesArray: Array<string> = []
    event.map((item: any)=> {
        valuesArray.push(item.value)
        return valuesArray
      })
      setSelectOptions(valuesArray)
      console.log(selectOptions)
      //first item is an empty array from the initial state,
      //but we need don't need that
  }

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