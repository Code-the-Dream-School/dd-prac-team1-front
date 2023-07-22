import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Heading>I am home</Heading>
      <Link to="/">BACK</Link>
    </>
  );
};

export default Home;
