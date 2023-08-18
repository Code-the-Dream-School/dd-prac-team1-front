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
  Text,
  Grid,
  GridItem,
  Textarea
} from "@chakra-ui/react";

const Contact = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <GridItem
        colSpan={1}
        w="100%"
        h="90vh"
        padding="50"
        display="flex"
        flexDirection="column">
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
                    question (or just want to say hello!) please feel free to
                    drop us a comment.
                  </Text>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input variant={"unstyled"} />
                    <FormErrorMessage>Name is required.</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input variant={"unstyled"} />
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea></Textarea>
                    <FormErrorMessage>Message is required.</FormErrorMessage>
                  </FormControl>
                </Box>
              </Stack>
              <Box p="10px">
                <Center>
                  <Button variant="outline" size="lg">
                    Submit
                  </Button>
                </Center>
              </Box>
            </Box>
          </Container>
        </Box>
      </GridItem>
      <GridItem
        colSpan={1}
        w="90%"
        backgroundImage="url('/images/produce.png')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      />
    </Grid>
  );
};

export default Contact;
