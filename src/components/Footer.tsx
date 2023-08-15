import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      as="footer"
      py={4}
      // bg={useColorModeValue("gray.100", "gray.900")}
      bg="gray.300"
      color="black"
      position="absolute"
      bottom="0"
      height="85"
      width="100%">

      <Flex justify="center">
        <IconButton
          as="a"
          href="https://github.com/Code-the-Dream-School/dd-prac-team1-front"
          target="_blank"
          aria-label="GitHub"
          icon={<FaGithub />}
          fontSize="1.5rem"
          mx={2}
        />
        <IconButton
          as="a"
          href="https://www.instagram.com/your-username"
          target="_blank"
          aria-label="Instagram"
          icon={<FaInstagram />}
          fontSize="1.5rem" 
          mx={2}
        />
        <IconButton
          as="a"
          href="https://www.facebook.com/your-username"
          target="_blank"
          aria-label="Facebook"
          icon={<FaFacebook />}
          fontSize="1.5rem"
          mx={2}
        />
      </Flex>
      <Flex justify="center" mt={2}>
        <Text>&copy; 2023 Olivier. All rights reserved.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
