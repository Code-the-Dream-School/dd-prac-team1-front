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
import { forgetPassword } from "../../utils/fetchData";

const ForgetPassword = () => {
  const [isSended, setIsSended] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToHome = () => {
    navigate("/");
  };

  const handleResetEmail = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const emailObj = Object.fromEntries(data.entries());
    forgetPassword(emailObj)
      .then(response => {
        console.log(response);
        toast({
          title: "",
          description: "",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
          render: () => (
            <>
              <Box p="7" bg="green" borderRadius="5">
                {response.data.message}
              </Box>
            </>
          )
        });
        setIsSended(true);
        e.target.reset();
      })
      .catch(error => {
        console.log(error);
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
          <Button variant="solid" type="submit" isDisabled={isSended}>
            Reset Password
          </Button>
        </Center>
      </Box>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Button variant="link" size="xs" mt="5" onClick={navigateToLogin}>
          <Text as="ins">Back to Login</Text>
        </Button>
        <Button variant="link" size="xs" mt="5" onClick={navigateToHome}>
          <Text as="ins">Back to Home page</Text>
        </Button>
      </Flex>
    </Container>
  );
};

export default ForgetPassword;
