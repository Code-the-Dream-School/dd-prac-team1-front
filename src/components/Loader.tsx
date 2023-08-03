import React from "react";
import { Box, Center, keyframes } from "@chakra-ui/react";

const loader = keyframes`
  from {
    opacity: 0.25;
    padding-top: 20px
  }
  to {
    opacity: 1;
    padding-right: 7px;
    padding-top: 70px

}
`;

const Loader = ({ text = "Loading..." }) => {
  return (
    <Center>
      {text.split("").map((letter, index) => (
        <Box
          as="span"
          animation={`${loader} infinite 5s alternate`}
          style={{ animationDelay: `${100 * index}ms` }}
          fontSize="6xl"
          letterSpacing="-1px"
          key={index}>
          {letter}
        </Box>
      ))}
    </Center>
  );
};
export default Loader;
