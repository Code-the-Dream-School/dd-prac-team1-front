import React from "react";
import { Box, Center, keyframes } from "@chakra-ui/react";

const loader = keyframes`
  from {
    opacity: 0.85;
    
  }
  to {
    opacity: 0.25;
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
          animation={`${loader} infinite 5s alternate ease-in-out`}
          style={{ animationDelay: `${100 * index}ms` }}
          fontSize={{
            base: "lg",
            sm: "2xl",
            md: "4xl",
            lg: "6xl"
          }}
          letterSpacing="-1px"
          key={index}>
          {letter}
        </Box>
      ))}
    </Center>
  );
};
export default Loader;
