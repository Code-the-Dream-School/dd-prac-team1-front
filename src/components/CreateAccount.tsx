import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  }

  return (
    <Box>
      <Container maxW='xl'>
        <VStack>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type='text' variant='flushed' />
            <FormLabel>Email</FormLabel>
            <Input type='email' variant='flushed' />
            <FormLabel>Password</FormLabel>
            <Input type='password' variant='flushed' />
            <FormLabel>Confirm Password</FormLabel>
            <Input type='password' variant='flushed' />
            <Center><Button variant='solid' type="submit" title="sign up" onClick={navigateToHome}>Sign Up</Button> </Center>
          </FormControl>
          <Button variant='link' type="button" size="xs" title="sign up"><Text as='ins'>or sign in</Text></Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default CreateAccount;
