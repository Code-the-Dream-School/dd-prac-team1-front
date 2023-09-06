import {
  Input,
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
  Textarea,
  useToast
} from "@chakra-ui/react";
import { sendEmail } from "../../utils/fetchData";

const Contact = () => {
  const toast = useToast();
  const handleSendEmail = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObject = Object.fromEntries(data.entries());
    sendEmail(dataObject)
      .then(response => {
        toast({
          title: "",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
          render: () => (
            <>
              <Box p="3" bg="green">
                {response.data.message}
              </Box>
            </>
          )
        });
        e.target.reset();
      })

      .catch(error => {
        toast({
          title: "Error",
          description: `${
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.response?.data ||
            error.message ||
            "unknown error"
          }`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      });
  };
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={6}
      p="5"
      borderRadius="lg"
      h={{
        md: "calc(100vh - 55px - 70px)"
      }}>
      <GridItem colSpan={{ base: 2, md: 1 }}>
        <Box
          as="form"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          onSubmit={handleSendEmail}>
          <Stack
            divider={<StackDivider />}
            direction="column"
            w={{ md: "70%" }}
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
                <Input
                  variant={"unstyled"}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
                <FormErrorMessage>Name is required.</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  variant={"unstyled"}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  name="message"
                  placeholder="Leave your message"></Textarea>
                <FormErrorMessage>Message is required.</FormErrorMessage>
              </FormControl>
            </Box>
          </Stack>
          <Box>
            <Button
              variant="solid"
              type="submit"
              size="lg"
              background={"green"}>
              Submit
            </Button>
          </Box>
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
          base: "50vh",
          sm: "50vh",
          md: "calc(100vh - 55px - 110px)"
        }}
      />
    </Grid>
  );
};

export default Contact;
