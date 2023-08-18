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
  Text,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/fetchData";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    register(name, email, password)
      .then(result => {
        if (result.status === 201) {
          sessionStorage.setItem("jwtToken", result.data.token);
          sessionStorage.setItem("username", result.data.user.username);
          navigate("/search-choice");
          setName("");
          setEmail("");
          setPassword("");
        }
      })
      .catch(error => {
        console.log(error);
        if (error.response.data.msg.includes("already")) {
          setErrorEmail("Account already exists");
        }
        if (error.response.data.msg.includes(8)) {
          setErrorPassword(error.response.data.msg);
        }
        if (
          error.response.data.msg.includes("format") &&
          error.response.data.msg.includes(8)
        ) {
          setErrorEmail(
            "Please enter a valid email address in this format: name@example.com"
          );
          setErrorPassword("Password should be at least 8 characters long");
        }
        if (error.response.data.msg.includes("requests")) {
          setErrorPassword(error.response.data.msg);
        }
        if (error) {
          toast({
            title: "Error",
            description: "Look underline description",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top"
          });
        }
      });
  };
  return (
    <Box>
      <Container maxW="xl">
        <Box
          as="form"
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
              onChange={event => {
                setEmail(event.target.value);
                setErrorEmail("");
              }}
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
                onChange={event => {
                  setPassword(event.target.value);
                  setErrorPassword("");
                }}
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
              <Button variant="solid" type="submit">
                SIGN UP
              </Button>
            </Center>
          </FormControl>
        </Box>
        <Center>
          <Button variant="link" size="xs" onClick={navigateToLogin}>
            <Text as="ins">or sign in</Text>
          </Button>
        </Center>
      </Container>
    </Box>
  );
};

export default Register;
