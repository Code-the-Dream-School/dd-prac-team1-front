import { Container, Grid } from "@chakra-ui/react";


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
                    // style={{
                    //   objectFit: "cover",
                      // width: "100%"
                      // height: "100%",
                    // }}
                  />
                </Box>
                <Heading size="md" mb={2} textAlign="center">
                  {member.name}
                </Heading>
                <Text fontSize="sm" fontStyle="italic" textAlign="center" >
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
