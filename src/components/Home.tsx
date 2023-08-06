import { Button, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Heading>Home Page</Heading>
      <Button>
        <Link as={RouterLink} to="/login">
          Sign in
        </Link>
      </Button>
      <Button>
        <Link as={RouterLink} to="/register">
          Create an account
        </Link>
      </Button>
    </>
  );
};

export default Home;
