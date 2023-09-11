import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../utils/fetchData";

const ForgotPassword = () => {
  const [isSended, setIsSended] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
    setIsSended(false);
    toast.closeAll();
  };
  const navigateToHome = () => {
    navigate("/");
    setIsSended(false);
    toast.closeAll();
  };

  const handleResetEmail = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const emailObj = Object.fromEntries(data.entries());
    forgotPassword(emailObj)
      .then(response => {
        toast({
          title: "",
          description: "",
          duration: 1000000,
          status: "success",
          isClosable: true,
          position: "top",
          render: () => (
            <>
              <Box p="15" bg="green" h="50px" borderRadius="5">
                We sent you an email with recovery link. Please check your
                email.
              </Box>
            </>
          )
        });
        setIsSended(true);
        e.target.reset();
      })
      .catch(error => {
        toast({
          title: "Error",
          description: `${
            error?.response?.data?.msg ||
            error?.response?.data?.message?.error ||
            error?.response?.data?.error ||
            error?.response?.data ||
            error?.message ||
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
    <Container maxW="xl" mt="50">
      <Box as="form" onSubmit={handleResetEmail}>
        <Box p="10px">
          <FormControl isRequired marginY="25">
            <FormLabel htmlFor="resetEmail">Email</FormLabel>
            <Input
              type="email"
              id="resetEmail"
              variant="flushed"
              name="email"
              placeholder="Enter email"
            />
          </FormControl>
        </Box>
        <Center mt="10">
          <Button
            variant="solid"
            type="submit"
            overflow="hidden"
            isDisabled={isSended}>
            Reset Password
          </Button>
        </Center>
      </Box>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Button variant="link" size="xs" mt="5" onClick={navigateToLogin}>
          <Text as="ins">Back to Login</Text>
        </Button>
        <Button
          variant="link"
          size="xs"
          mt="5"
          overflow="hidden"
          onClick={navigateToHome}>
          <Text as="ins">Back to Home page</Text>
        </Button>
      </Flex>
    </Container>
  );
};

export default ForgotPassword;
