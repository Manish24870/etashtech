import {
  Input,
  Container,
  Flex,
  Card,
  CardBody,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  // When user submits the register form
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("jwt", response.data.token);
      const decoded = jwt_decode(response.data.token);
      localStorage.setItem("user", decoded);
      toast({
        title: "Success",
        description: "Registration successful",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
      navigate("/", { replace: true });
    } catch (err) {
      toast({
        title: "Error",
        description: err.response.data.error,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <Card mt={20}>
        <CardBody>
          <Heading as="h3" size="md" mb={2}>
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
