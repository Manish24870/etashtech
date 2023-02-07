import {
  Input,
  Container,
  Box,
  Flex,
  Card,
  CardBody,
  Button,
  Heading,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import ReminderItem from "./ReminderItem";

const Reminders = (props) => {
  const [reminders, setReminders] = useState(null);
  const toast = useToast();

  // Fetch all the reminders on component mount
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/reminders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReminders(response.data.reminders);
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
    fetchReminders();
  }, []);

  // Delete a reminder when user clicks the delete button
  const deleteReminderHandler = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      await axios.delete(process.env.REACT_APP_SERVER_URL + `/reminders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let newReminders = reminders.filter((reminder) => reminder._id !== id);
      setReminders(newReminders);
      toast({
        title: "Success",
        description: "Reminder deleted successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
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
    <Container maxW="4xl">
      <Flex justify="space-between" mt={3} mb={4}>
        <Heading as="h3" size="md">
          All Reminders
        </Heading>
        <Button
          as={Link}
          to="/reminders/add"
          colorScheme="purple"
          size="sm"
          leftIcon={<SmallAddIcon />}
        >
          Add Reminder
        </Button>
      </Flex>

      <Box>
        {reminders ? (
          reminders.map((reminder) => (
            <ReminderItem
              key={reminder._id}
              reminder={reminder}
              deleteReminderHandler={() => deleteReminderHandler(reminder._id)}
            />
          ))
        ) : (
          <Spinner />
        )}
      </Box>
    </Container>
  );
};

export default Reminders;
