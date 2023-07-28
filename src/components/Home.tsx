import { Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Heading>I am home</Heading>
      <Link as={RouterLink} to='/'>
        BACK
      </Link>
    </>
  );
};

export default Home;
