import { Input, Container, Flex, Card, CardBody, Button, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(name, email, password);
  };

  return (
    <Container>
      <Card mt={20}>
        <CardBody>
          <Heading as="h3" size="lg" mb={2}>
            Register
          </Heading>
          <Text mb={6}>Fill up the form below to register as a new user</Text>
          <Flex direction="column">
            <form onSubmit={formSubmitHandler}>
              <Input
                placeholder="Full name"
                mb={4}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Email"
                mb={4}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                mb={4}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button colorScheme="purple" mt={4} type="submit">
                Register
              </Button>
            </form>
          </Flex>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Register;
