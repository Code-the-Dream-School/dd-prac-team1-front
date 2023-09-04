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
    <Grid templateColumns="repeat(2, 1fr)" gap={6} p="5">
      <GridItem
        colSpan={{ base: 2, md: 1 }}
        h={{
          base: "calc(100vh - 128px - 167px)",
          sm: "calc(100vh - 55px - 167px)",
          md: "calc(100vh - 55px - 70px)"
        }}>
        <Box
          as="form"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column">
          {/* <Container maxW="xl"> */}

          <Stack
            divider={<StackDivider />}
            direction="column"
            w="70%"
            // spacing="6px"
            marginY="7">
            <Box>
              <Heading>Contact</Heading>
              <Text pt="2" fontSize="sm">
                Hi there! Thanks for visiting Olivier. If you have another
                question (or just want to say hello!) please feel free to drop
                us a comment.
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
              <Button
                variant="solid"
                type="submit"
                size="lg"
                background={"green"}>
                Submit
              </Button>
            </Center>
          </Box>

          {/* </Container> */}
        </Box>
      </GridItem>
      <GridItem
        colSpan={{ base: 2, md: 1 }}
        w="100%"
        backgroundImage="url('/images/produce.png')"
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        borderRadius="lg"
        h={{
          base: "calc(100vh - 128px - 167px)",
          sm: "calc(100vh - 55px - 167px)",
          md: "calc(100vh - 55px - 70px)"
        }}
      />
    </Grid>
  );
};

export default Contact;
