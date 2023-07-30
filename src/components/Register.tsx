import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/fetchData";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const toast = useToast();

  const handleShowPassword = () => {
    if (type === "password") {
      setType("text");
      setShowPassword(true);
    } else {
      setType("password");
      setShowPassword(false);
    }
  };

  const handleRegister = () => {
    register(name, email, password, confirmPassword)
      .then(data => {
        if (data.status === 201) {
          navigate("/home");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      })
      .catch(error => {
        console.log(error);
        if (
          error.response.data.msg ===
          "The email address you entered is already taken."
        ) {
          setErrorEmail("Account already exists");
        }
        if (
          error.response.data.msg ===
          "Password should be at least 8 characters long"
        ) {
          setErrorPassword(error.response.data.msg);
        }
        if (
          error.response.data.msg ===
          "Please enter a valid email address in this format: name@example.com,Password should be at least 8 characters long"
        ) {
          setErrorEmail("Account already exists");
          setErrorPassword("Password should be at least 8 characters long");
        }

        if (error) {
          toast({
            title: "Error",
            status: "error",
            isClosable: true
          });
        }
      });
  };
  console.log(errorEmail);
  return (
    <Box>
      <Container maxW="xl">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleRegister();
          }}>
          <FormControl isRequired>
            <FormLabel htmlFor="registerName">Name</FormLabel>
            <Input
              type="text"
              id="registerName"
              variant="flushed"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <FormHelperText>Please enter your name</FormHelperText>
          </FormControl>
          <FormControl isInvalid={errorEmail.length > 0} isRequired>
            <FormLabel htmlFor="registerEmail">Email</FormLabel>
            <Input
              type="email"
              id="registerEmail"
              variant="flushed"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            {errorEmail.length === 0 && (
              <FormHelperText>
                Please enter a valid email address in this format:
                name@example.com
              </FormHelperText>
            )}
            {errorEmail.length > 0 && (
              <FormErrorMessage>{errorEmail}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errorPassword.length > 0} isRequired>
            <FormLabel htmlFor="registerPassword">Password</FormLabel>
            <InputGroup>
              <Input
                type={type}
                value={password}
                id="registerPassword"
                variant="flushed"
                onChange={event => setPassword(event.target.value)}
              />
              <InputRightElement>
                <Button size="xs" variant="ghost" onClick={handleShowPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {password.length < 8 && errorPassword.length === 0 && (
              <FormHelperText>
                Password must be at least 8 characters long
              </FormHelperText>
            )}
            {errorPassword.length > 0 && (
              <FormErrorMessage>{errorPassword}</FormErrorMessage>
            )}
            <Center>
              <Button variant="solid" type="submit" title="sign up">
                Sign Up
              </Button>
            </Center>
          </FormControl>
        </form>
        <Center>
          <Button
            variant="link"
            type="button"
            size="xs"
            title="or sign in"
            onClick={navigateToLogin}>
            <Text as="ins">or sign in</Text>
          </Button>
        </Center>
      </Container>
    </Box>
  );
};

export default Register;
