

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Link,
    Button,
} from '@chakra-ui/react'

import { Link as RouterLink } from 'react-router-dom';


const Error = () => {
    return (
        <Alert
            status='error'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='100vh'
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                Error!
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                Sorry there was an error processing your request
            </AlertDescription>
            <Button>
                <Link as={RouterLink} to='/login'>
                    Try again!
                </Link>
            </Button>
        </Alert>
        
    )
};

export default Error;