import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";
import { searchWithOpenAI } from "../utils/fetchData";

const SearchWithAI = () => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    searchWithOpenAI(search)
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
            <FormLabel>how i can help</FormLabel>
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
                title="login"
                onClick={handleSearch}>
                Search
              </Button>{" "}
            </Center>
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};

export default SearchWithAI;
