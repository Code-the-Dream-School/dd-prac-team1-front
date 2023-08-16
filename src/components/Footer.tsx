import { Box, Flex, Text, IconButton, Container } from '@chakra-ui/react';
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      as="footer"
      py={4}
      bg="gray.200"
      color="black"
      position="absolute"
      bottom="0"
      height="85"
      width="100%">

      <Container maxW="6xl">
        <Flex justify="space-between" align="center">
          <Text pl={4}>&copy; 2023 Olivier. All rights reserved.</Text>

            <Flex justify="center" alignItems="center">
              <Box as="a" href="/OurTeam" mx={2}>
                Meet the Team
              </Box>
              <Box as="a" href="/ContactUs" mx={2}>
                Contact
              </Box>
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
        </Flex>
      </Container>
    </Box>
  
  );
};

export default Footer;
