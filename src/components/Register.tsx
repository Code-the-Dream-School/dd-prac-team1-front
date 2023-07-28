import { useState } from 'react'
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Text,
  UnorderedList,
  VStack
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import { register } from '../util/fetchData';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showRequirements, setShowRequirements] = useState(false)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [type, setType] = useState('password');
  const [typeConfirm, setTypeConfirm] = useState('password');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  //const navigateToHome = () => {
  //  navigate('/home');
  //}

  const navigateToLogin = () => {
    navigate('/login');
  }

  const handleShowPassword = () => {
    if (type === 'password') {
      setType('text')
      setTypeConfirm('text')
      setShowPassword(true)
    } else {
      setType('password')
      setTypeConfirm('password')
      setShowPassword(false)
    }
  }

  return (
    <Box>
      <Container maxW='xl'>
        <VStack>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input 
              type='text' 
              id='registerUsername' 
              variant='flushed' 
              value={name}
              onChange={(event) => setName(event.target.value)}
              />
            <FormLabel>Email</FormLabel>
            <Input 
              type='email' 
              id='registerEmail' 
              variant='flushed' 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={type}
                value={password}
                id='registerPassword'
                variant='flushed'
                onClick={() => setShowRequirements(true)}
                onChange={(event) => setPassword(event.target.value)} />
              <InputRightElement>
                <Button size='xs' variant='ghost' onClick={handleShowPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {showRequirements ? (
              <FormHelperText>
                <UnorderedList>
                  <ListItem>Password must be at least 8 characters long.</ListItem>
                  <ListItem>Password must contain at least one uppercase letter (A-Z).</ListItem>
                  <ListItem>Password must contain at least one lowercase letter (a-z).</ListItem>
                  <ListItem>Password must contain at least one number (0-9).</ListItem>
                  <ListItem>Password may include special characters (e.g., !@#$%^&*).</ListItem>
                </UnorderedList>
              </FormHelperText>) : null}
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={typeConfirm}
                value={confirmPassword}
                id='registerConfirmPassword'
                variant='flushed'
                onClick={() => setShowRequirements(false)}
                onChange={(event) => setConfirmPassword(event.target.value)} />
              <InputRightElement>
                <Button size='xs' variant='ghost' onClick={handleShowPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Center>
              <Button 
                variant='solid' type='submit' title='sign up' 
                onClick={()=> register(
                  name, setName, 
                  email, setEmail,
                  password, setPassword,
                  confirmPassword, setConfirmPassword)}
                //onClick={navigateToHome}
                >
                  Sign Up
              </Button> 
            </Center>
          </FormControl>
          <Button variant='link' type='button' size='xs' title='or sign in' onClick={navigateToLogin}><Text as='ins'>or sign in</Text></Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default Register;
