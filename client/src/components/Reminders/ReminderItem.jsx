import {
  Flex,
  Card,
  CardBody,
  Text,
  Button,
  useToast,
  Box,
  Spacer,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const ReminderItem = (props) => {
  return (
    <Card mb={4} variant="filled">
      <CardBody>
        <Flex align="center">
          <Box>
            <Text fontSize="lg" fontWeight={500}>
              {props.reminder.title}
            </Text>
            <Text>{props.reminder.description}</Text>
            <Flex align="flex-end">
              <Text color="purple" fontWeight={500} mt={1}>
                Deadline: {new Date(props.reminder.reminderDate).toLocaleString()}
              </Text>
              {props.reminder.status === "pending" ? (
                <Badge ml={6} colorScheme="red">
                  Pending
                </Badge>
              ) : (
                <Badge ml={6} colorScheme="green">
                  Completed
                </Badge>
              )}
            </Flex>
          </Box>
          <Spacer />
          <Box>
            <Button
              size="sm"
              mr={2}
              colorScheme="blue"
              variant="ghost"
              as={Link}
              to={`/reminders/${props.reminder._id}/edit`}
            >
              Edit
            </Button>
            <IconButton icon={<DeleteIcon />} color="red" onClick={props.deleteReminderHandler} />
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ReminderItem;
