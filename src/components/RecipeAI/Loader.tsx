import React from "react";
import { Box, keyframes } from "@chakra-ui/react";

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
    <Box display="flex" justifyContent="center" minH="100px">
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
          overflow="hidden"
          letterSpacing="-1px"
          key={index}>
          {letter}
        </Box>
      ))}
    </Box>
  );
};
export default Loader;
