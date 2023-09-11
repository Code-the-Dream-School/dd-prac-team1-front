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
    role: "Front-end team",
    imageUrl: "/images/AnnaPestova.png",
    bio: "A Frontend Developer (React, JavaScript). Passionate to math, logic, and order, trying to implement it in the code. Eager to learn and improve skills. Code is a puzzle that has to be solved.",
    githubUrl: "https://github.com/AnnaPestova1"
  },
  {
    name: "Anna Solovykh",
    role: "Front-end team",
    imageUrl: "/images/AnnaSolovykh.jpeg",
    bio: "Driven by a passion for learning and languages, Anna ventured into web development. Her teaching background endowed her with precision, teamwork, and project skills. With a Regional Studies degree, she embraces diversity and challenges, letting her dreams fuel her journey.",
    githubUrl: "https://github.com/AnnaSolovykh"
  },
  {
    name: "Aigul Yedigeyeva",
    role: "Back-end team",
    imageUrl: "/images/AygulYegideyeva.png",
    bio: "Exploring full-stack coding with the zeal of a culinary enthusiast, I’m joyfully crafting digital innovations. Leveraging 15 years of experience in change-driving industry-leading companies, I’ve refined supply networks, enhanced marketing strategies, designed project blueprints, and introduced process innovations. The synergy of my full-stack knowledge and past experience opens boundless digital horizons.",
    githubUrl: "https://github.com/AigulY"
  },
  {
    name: "Elena Cherpakova",
    role: "Back-end team",
    imageUrl: "/images/ElenaCherpakova.jpeg",
    bio: "Full Stack Web Developer, a continuous learner in the world of code. Ignited by fresh tech & groundbreaking ideas! Relentlessly pursuing excellence in crafting intricate digital solutions, where dedication and passion fuse seamlessly in each endeavor.",
    githubUrl: "https://github.com/ElenaCherpakova"
  },
  {
    name: "Elena Gornovoy",
    role: "Front-end team",
    imageUrl: "/images/ElenaGornovoy.jpg",
    bio: "An entry-level frontend developer with an interest in creating remarkable digital experiences that make a meaningful impact, I'm on a path deeply connected to the world of branding and user experience, where I understand the significance of every pixel and interaction.",
    githubUrl: "https://github.com/ElenaGor8"
  },
  {
    name: "Svetlana Beynik",
    role: "Front-end team",
    imageUrl: "/images/SvetlanaBeynik.png",
    bio: "I am an enthusiastic and dedicated entry-level front-end developer with a passion for creating user-friendly and visually appealing websites. My goal is to contribute to innovative projects, continuously grow as a developer, and deliver solutions that engage and delight users.",
    githubUrl: "https://github.com/SvetlanaBeynik"
  },
  {
    name: "Rebekah Callari-Kaczmarczyk",
    role: "Mentor",
    imageUrl: "/images/Rebekah Callari-Kaczmarczyk.png",
    bio: "A software engineer who builds tools for data-driven decision making. Passionate about mentoring junior engineers, data visualization, and applied linguistics.",
    githubUrl: "https://github.com/rebekahcallkacz"
  },

  {
    name: "Marcus Blanc",
    role: "Mentor",
    imageUrl: "/images/MarcusBlanc.png",
    bio: "A multifaceted software engineer whose work focuses on frontend development. My many passions center on creativity, such screenplay writing, running and obsessing over the latest TV shows & movies.",
    githubUrl: "https://github.com/mblanc2414"
  },
  {
    name: "Ekaterina Bondareva",
    role: "Mentor",
    imageUrl: "/images/EkaterinaBondareva.png",
    bio: "A Full Stack Software Engineer and apprentice at Code The Dream (CTD), where she mentors students. With a Master's in Applied Computer Science and experience in finance management for international companies, she transitioned her career to pursue her coding dream. She's dedicated to CTD, volunteering, and continuous learning.",
    githubUrl: "https://github.com/Ekaterina-Bondareva"
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
              borderColor="green"
              p={4}>
              <a
                href={member.githubUrl}
                target="_blank"
                rel="noopener noreferrer">
                <Box
                  w={40}
                  h={40}
                  borderRadius="full"
                  overflow="hidden"
                  mb={4}
                  mx="auto">
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
                <Heading size="md" mb={2} textAlign="center">
                  {member.name}
                </Heading>
                <Text fontSize="sm" fontStyle="italic" textAlign="center">
                  {member.role}
                </Text>
                <Text fontSize="sm" mt={2} textAlign="justify">
                  {member.bio}
                </Text>
              </a>
            </Flex>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default OurTeam;
