import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
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
import { login } from "../utils/fetchData";

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
          navigate("/search-choice", {
            state: {
              username: result.data.user.username
            }
          });
          setEmail("");
          setPassword("");
        }
      })
      .catch(error => {
        console.log(error);
        if (error) {
          toast({
            title: "Error",
            description: "Look underline description",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top"
          });
          setErrorOccur(true);
        }
      });
  };

  return (
    <Box>
      <Container maxW="xl">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }}>
          <FormControl isRequired>
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
          <FormControl isInvalid={errorOccur} isRequired>
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
          <Center>
            <Button variant="solid" type="submit" title="login">
              SIGN IN
            </Button>
          </Center>
        </form>
        <Center>
          <Button
            variant="link"
            type="button"
            size="xs"
            title="or create an account"
            onClick={navigateToRegister}>
            <Text as="ins">or create an account</Text>
          </Button>
        </Center>
      </Container>
    </Box>
  );
};

export default Login;
