import {
  Container,
  Box,
  Flex,
  Button,
  Heading,
  Text,
  Input,
  Spinner,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import ReminderList from "./ReminderList";
import ExportCSV from "./ExportCSV";

const Reminders = (props) => {
  const [reminders, setReminders] = useState(null);
  const [order, setOrder] = useState("ascending");
  const [sortBy, setSortBy] = useState(null);
  const [searchText, setSearchText] = useState("");
  const toast = useToast();

  // hook to sort the reminders
  useEffect(() => {
    if (reminders) {
      let newReminders = [...reminders];
      if (sortBy === "title" && order === "ascending") {
        newReminders.sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
      } else if (sortBy === "title" && order === "descending") {
        newReminders.sort(function (a, b) {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 0;
        });
      } else if (sortBy === "date" && order === "ascending") {
        newReminders.sort(function (a, b) {
          if (a.reminderDate < b.reminderDate) {
            return -1;
          }
          if (a.reminderDate > b.reminderDate) {
            return 1;
          }
          return 0;
        });
      } else if (sortBy === "date" && order === "descending") {
        newReminders.sort(function (a, b) {
          if (a.reminderDate < b.reminderDate) {
            return 1;
          }
          if (a.reminderDate > b.reminderDate) {
            return -1;
          }
          return 0;
        });
      }
      setReminders(newReminders);
    }
  }, [sortBy, order]);

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
      <Flex justify="space-between" mt={3} mb={2}>
        <Heading as="h3" size="md">
          All Reminders
        </Heading>
        <Flex>
          <Select
            placeholder="Sort By"
            mr={4}
            size="sm"
            sx={{ width: "105%" }}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="date">Date</option>
          </Select>
          <Select
            placeholder="Order"
            defaultValue="ascending"
            size="sm"
            onChange={(e) => setOrder(e.target.value)}
            disabled={!sortBy}
          >
            <option value="ascending">Asc</option>
            <option value="descending">Desc</option>
          </Select>
        </Flex>

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

      <Flex justify="space-between">
        <Input
          placeholder="Search reminders"
          size="sm"
          mb={3}
          mr={8}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          width={"80%"}
        />
        {/* <Button size="sm" colorScheme="blue">
          Export CSV
        </Button> */}
        {reminders ? <ExportCSV reminders={reminders} /> : null}
      </Flex>

      <Box>
        {reminders ? (
          <ReminderList
            reminders={reminders}
            deleteReminderHandler={deleteReminderHandler}
            searchText={searchText}
          />
        ) : (
          <Spinner />
        )}
      </Box>
    </Container>
  );
};

export default Reminders;
