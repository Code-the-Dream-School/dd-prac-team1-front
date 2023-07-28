
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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom";
import { login } from "../utils/fetchData";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate("/register");
    }
    const handleShowPassword = () => {
        if (type === "password") {
            setType("text")
            setShowPassword(true)
        } else {
            setType("password")
            setShowPassword(false)
        }
    }

    const handleLogin = () => {
        login(email, password)
        .then((data) => {
            if (data.status === 200) {
                navigate("/home");
            }
        })
        .catch((error) => {
            console.log(error);
            if (error) {
                navigate("/404");
            }
        });    
        setEmail("");
        setPassword("");
    }

    return (
        <Box>
            <Container maxW="xl">
                <VStack>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            type="email" 
                            id="loginEmail" 
                            variant="flushed" 
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={type}
                                value={password}
                                id="loginPassword"
                                variant="flushed"
                                onChange={(event) => setPassword(event.target.value)} />
                            <InputRightElement>
                                <Button size="xs" variant="ghost" onClick={handleShowPassword}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Center>
                            <Button 
                                variant="solid" 
                                type="submit" 
                                title="login" 
                                onClick={handleLogin}
                                >
                                Login
                            </Button> 
                        </Center>
                    </FormControl>
                    <Button variant="link" type="button" size="xs" title="forgot password?"><Text as="ins">Forgot Password?</Text></Button>
                    <Button variant="link" type="button" size="xs" title="or create an account" onClick={navigateToRegister}><Text as="ins">or create an account</Text></Button>
                </VStack>
            </Container>
        </Box>
    );
};

export default Login;