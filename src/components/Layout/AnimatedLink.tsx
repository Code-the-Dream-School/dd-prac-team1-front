import { Box, Link } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

// Add the styles and animations to the links
const AnimatedNavLink = ({ href, children }) => {
    console.log("here")
    return (
        <Text
        as="a"
        href={href}
        position="relative"
        display="inline-block"
        textDecoration="none"
        color="#333"
        _hover={{
          "&::before": {
            width: "100%",
          },
        }}
      >
        {children}
        <Text
          position="absolute"
          bottom="0"
          left="-100%"
          width="100%"
          height="2px"
          backgroundColor="#007bff"
          transition="left 0.3s ease-in-out"
          content=""
        />
      </Text>
    );
  };
export default AnimatedNavLink;