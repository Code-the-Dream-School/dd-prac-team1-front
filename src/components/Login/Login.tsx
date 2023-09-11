import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/fetchData";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [errorOccur, setErrorOccur] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate("/register");
  };
  const navigateToForgotPassword = () => {
    navigate("/forget-password");
  };
  const handleShowPassword = () => {
    if (type === "password") {
      setType("text");
      setShowPassword(true);
    } else {
      setType("password");
      setShowPassword(false);
    }
  };

  const handleLogin = () => {
    login(email, password)
      .then(result => {
        if (result.status === 200) {
          sessionStorage.setItem("jwtToken", result.data.token);
          sessionStorage.setItem("username", result.data.user.username);
          navigate("/search-choice");
          setEmail("");
          setPassword("");
        }
      })
      .catch(error => {
        if (error?.response?.data?.msg.includes("Invalid password")) {
          setErrorOccur(true);
          return;
        }
        if (error?.response?.data?.msg.includes("Invalid email")) {
          setErrorOccur(true);
          return;
        }
        toast({
          title: "Error",
          description: `${
            error?.response?.data?.msg ||
            error?.response?.data?.message ||
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
    <Container maxW="xl" mt="30">
      <Box
        as="form"
        onSubmit={e => {
          e.preventDefault();
          handleLogin();
        }}>
        <Box p="10px">
          <FormControl isRequired marginY="25">
            <FormLabel htmlFor="loginEmail">Email</FormLabel>
            <Input
              type="email"
              id="loginEmail"
              variant="flushed"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
                setErrorOccur(false);
              }}
            />
          </FormControl>
        </Box>
        <Box p="10px">
          <FormControl isInvalid={errorOccur} isRequired marginY="25">
            <FormLabel htmlFor="loginPassword">Password</FormLabel>
            <InputGroup>
              <Input
                type={type}
                value={password}
                id="loginPassword"
                variant="flushed"
                onChange={event => {
                  setPassword(event.target.value);
                  setErrorOccur(false);
                }}
              />
              <InputRightElement>
                <Button size="xs" variant="ghost" onClick={handleShowPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errorOccur && (
              <FormErrorMessage>
                Combination email/password was not recognized
              </FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Center mt="10">
          <Button variant="solid" type="submit">
            SIGN IN
          </Button>
        </Center>
      </Box>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Button
          variant="link"
          size="xs"
          mt="5"
          onClick={navigateToForgotPassword}>
          <Text as="ins">Forgot password?</Text>
        </Button>
        <Button variant="link" size="xs" mt="5" onClick={navigateToRegister}>
          <Text as="ins">Create an account</Text>
        </Button>
      </Flex>
    </Container>
  );
};

export default Login;
