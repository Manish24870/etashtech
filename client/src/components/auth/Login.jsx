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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  // When user clicks the login button
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/auth/login", {
        email,
        password,
      });
      localStorage.setItem("jwt", response.data.token);
      const decoded = jwt_decode(response.data.token);
      localStorage.setItem("user", decoded);
      toast({
        title: "Success",
        description: "Login successful",
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
            Login
          </Heading>
          <Text mb={6}>Fill up the form below to login to the application</Text>
          <Flex direction="column">
            <form onSubmit={formSubmitHandler}>
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
                Login
              </Button>
            </form>
          </Flex>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;
