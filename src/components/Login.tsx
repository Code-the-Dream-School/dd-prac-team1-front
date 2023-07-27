
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

const Login = () => {

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/home");
    }
    const navigateToRegister = () => {
        navigate("/register");
    }

    return (
        <Box>
            <Container maxW='xl'>
                <VStack>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type='email' variant='flushed' />
                        <FormLabel>Password</FormLabel>
                        <Input type='password' variant='flushed' />
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
