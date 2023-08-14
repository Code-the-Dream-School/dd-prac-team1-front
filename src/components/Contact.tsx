import {
  Input,
  Center,
  Container,
  StackDivider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Stack,
  Button,
  Box,
  Link,
  Text
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Contact = () => {
  return (
    <Box>
      <Container maxW="xl">
        <Box>
          <Stack
            divider={<StackDivider />}
            direction={["column"]}
            spacing="6px">
            <Box>
              <Heading size="md">Contact</Heading>
              <Text pt="2" fontSize="sm">
                Hi there! Thanks for visiting Olivier. If you have another
                question (or just want to say hello!) please feel free to drop
                us a comment.
              </Text>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>NAME</FormLabel>
                <Input variant={"unstyled"} />
                <FormErrorMessage>Name is required.</FormErrorMessage>
              </FormControl>
            </Box>

            <Box>
              <FormControl isRequired>
                <FormLabel>EMAIL</FormLabel>
                <Input variant={"unstyled"} />
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>MESSAGE</FormLabel>
                <Input variant={"unstyled"} />
                <FormErrorMessage>Message is required.</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <Center>
                <Button variant="outline" size="lg">
                  <Link as={RouterLink} to="/contact">
                    submit
                  </Link>
                </Button>
              </Center>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
