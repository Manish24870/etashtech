import { Box, Button, ButtonGroup, Container, Flex, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box as="section">
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Container py={4} maxW="4xl">
          <HStack spacing="10" justify="space-between">
            <Flex justify="space-between" flex="1">
              <ButtonGroup variant="link" spacing="8">
                <Button as={Link} to="/reminders" color="black">
                  Reminders
                </Button>
              </ButtonGroup>
              <HStack spacing="3">
                <Button as={Link} to="/login" mr={4} size="sm">
                  Login
                </Button>
                <Button colorScheme="purple" as={Link} to="/register" size="sm">
                  Register
                </Button>
              </HStack>
            </Flex>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Navbar;
