
import { useState } from "react"
import {
    Box,
    Button,
    Center,
    Container,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/home");
    }
    const navigateToRegister = () => {
        navigate("/register");
    }
    const handleShowPassword = () => {
        if (type === 'password') {
            setType('text')
            setShowPassword(true)
        } else {
            setType('password')
            setShowPassword(false)
        }
    }

    return (
        <Box>
            <Container maxW='xl'>
                <VStack>
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' id="loginUsername" variant='flushed' />
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={type}
                                value={password}
                                id="loginPassword"
                                variant='flushed'
                                onChange={(event) => { setPassword(event.target.value) }} />
                            <InputRightElement>
                                <Button size='xs' variant='ghost' onClick={handleShowPassword}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Center><Button variant='solid' type="submit" title="login" onClick={navigateToHome}>Login</Button> </Center>
                    </FormControl>
                    <Button variant='link' type="button" size="xs" title="forgot password?"><Text as='ins'>Forgot Password?</Text></Button>
                    <Button variant='link' type="button" size="xs" title="or create an account" onClick={navigateToRegister}><Text as='ins'>or create an account</Text></Button>
                </VStack>
            </Container>
        </Box>
    );
};

export default Login;
