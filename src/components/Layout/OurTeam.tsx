import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text
} from "@chakra-ui/react";

const teamMembers = [
  {
    name: "Anna Pestova",
    role: "Front-end",
    imageUrl: "/images/kitten.png",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    githubUrl: "https://github.com/AnnaPestova1"
  },
  {
    name: "Anna Solovykh",
    role: "Front-end",
    imageUrl: "/images/AnnaSolovykh.jpeg",
    bio: "A web developer specializing in Frontend (JS, React, Redux), wishing to improve and master.",
    githubUrl: "https://github.com/AnnaSolovykh"
  },
  {
    name: "Aigul Yedigeyeva",
    role: "Back-end",
    imageUrl: "/images/kitten.png",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    githubUrl: "https://github.com/AigulYe"
  },
  {
    name: "Elena Cherpakova",
    role: "Back-end",
    imageUrl: "/images/ElenaCherpakova.jpeg",
    bio: "Full Stack Web Developer, a continuous learner in the world of code. Ignited by fresh tech & groundbreaking ideas! Relentlessly pursuing excellence in crafting intricate digital solutions, where dedication and passion fuse seamlessly in each endeavor.",
    githubUrl: "https://github.com/ElenaCherpakova"
  },
  {
    name: "Elena Gornovoy",
    role: "Front-end",
    imageUrl: "/images/ElenaGornovoy.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    githubUrl: "https://github.com/ElenaGor8"
  },
  {
    name: "Svetlana Beynik",
    role: "Front-end",
    imageUrl: "/images/kitten.png",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    githubUrl: "https://github.com/SvetlanaBeynik"
  }
];

const OurTeam: React.FC = () => {
  return (
    <Box py={8}>
      <Container maxW="6xl">
        <Heading textAlign="center" mb={10}>
          Our Team
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {teamMembers.map((member, index) => (
            <Flex
              key={index}
              direction="column"
              alignItems="center"
              borderRadius="lg"
              borderWidth="1px"
              p={4}>
              <a
                href={member.githubUrl}
                target="_blank"
                rel="noopener noreferrer">
                <Box w={40} h={40} borderRadius="full" overflow="hidden" mb={4}>
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%"
                    }}
                  />
                </Box>
              </a>
              <Heading size="md" mb={2}>
                {member.name}
              </Heading>
              <Text fontSize="sm" textAlign="center">
                {member.role}
              </Text>
              <Text fontSize="sm" mt={2} textAlign="justify">
                {member.bio}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default OurTeam;