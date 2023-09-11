import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../utils/fetchData";

const ResetPassword = () => {
  const [isSended, setIsSended] = useState(false);
  const [type, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { slug } = useParams();
  const token = slug;
  const handleShowPassword = () => {
    if (type === "password") {
      setType("text");
      setShowPassword(true);
    } else {
      setType("password");
      setShowPassword(false);
    }
  };
  const navigateToHome = () => {
    navigate("/");
    setIsSended(false);
    toast.closeAll();
  };

  const handleNewPassword = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const passwordObj = Object.fromEntries(data.entries());
    if (!token) return;
    resetPassword(token, passwordObj)
      .then(response => {
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
        navigate("/login");
        toast.closeAll();
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
      <Box as="form" onSubmit={handleNewPassword}>
        <Box p="10px">
          <FormControl isRequired marginY="25">
            <FormLabel htmlFor="resetEmail">New password</FormLabel>
            <InputGroup>
              <Input
                type={type}
                id="newPassword"
                variant="flushed"
                name="newPassword"
                placeholder="Enter new password"
              />
              <InputRightElement>
                <Button size="xs" variant="ghost" onClick={handleShowPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
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

export default ResetPassword;
