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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditReminder = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminderDate, setReminderDate] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  const params = useParams();

  // Fetch the remainder to edit
  useEffect(() => {
    const fetchReminder = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/reminders/${params.reminderId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTitle(response.data.reminder.title);
        setDescription(response.data.reminder.description);
        setReminderDate(response.data.reminder.reminderDate);
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
    fetchReminder();
  }, []);

  // When user submits the edit reminder form
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      console.log(token);
      await axios.patch(
        process.env.REACT_APP_SERVER_URL + `/reminders/${params.reminderId}/edit`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/reminders", { replace: true });
      toast({
        title: "Success",
        description: "Reminder edited successfully",
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
            Edit a Reminder
          </Heading>
          <Text mb={6}>Change the details of the current reminder</Text>
          <Flex direction="column">
            {title ? (
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
                <Text color="purple" fontWeight={500} mt={1}>
                  Deadline: {new Date(reminderDate).toLocaleString()}
                </Text>
                <Button colorScheme="purple" mt={4} type="submit">
                  Edit
                </Button>
              </form>
            ) : (
              <Spinner />
            )}
          </Flex>
        </CardBody>
      </Card>
    </Container>
  );
};

export default EditReminder;
