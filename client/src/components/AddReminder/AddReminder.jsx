import {
  Input,
  Container,
  Flex,
  Card,
  CardBody,
  Button,
  Heading,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AddReminder = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminderDate, setReminderDate] = useState();
  const toast = useToast();
  const navigate = useNavigate();

  // When user creates a new reminder
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/reminders/add",
        {
          title,
          description,
          reminderDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/reminders", { replace: true });
      toast({
        title: "Success",
        description: "Reminder created successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
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
            Add a Reminder
          </Heading>
          <Text mb={6}>Enter the details of the new reminder</Text>
          <Flex direction="column">
            <form onSubmit={formSubmitHandler}>
              <Input
                placeholder="Title"
                mb={4}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Description"
                mb={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                type="datetime-local"
                placeholder="Reminder date"
                mb={4}
                required
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
              />
              <Button colorScheme="purple" mt={4} type="submit">
                Create
              </Button>
            </form>
          </Flex>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AddReminder;
