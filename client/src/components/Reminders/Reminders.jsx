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
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";

import ReminderItem from "./ReminderItem";

const Reminders = (props) => {
  return (
    <Container maxW="4xl">
      <Heading as="h3" size="md" mt={2} mb={4}>
        All Reminders
      </Heading>
      <Box>
        <ReminderItem />
        <ReminderItem />
        <ReminderItem />
        <ReminderItem />
      </Box>
    </Container>
  );
};

export default Reminders;
