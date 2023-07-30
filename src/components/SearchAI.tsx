import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";
import { searchAI } from "../utils/fetchData";

const SearchAI = () => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    searchAI(search)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Box>
      <Container maxW="xl">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSearch();
          }}>
          <FormControl>
            <FormLabel htmlFor="searchAI">how i can help</FormLabel>
            <Input
              type="text"
              id="searchAI"
              value={search}
              variant="flushed"
              onChange={event => setSearch(event.target.value)}
            />

            <Center>
              <Button
                variant="solid"
                type="submit"
                title="search recipe with AI">
                Search
              </Button>
            </Center>
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};

export default SearchAI;
