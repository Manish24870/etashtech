import { Flex, Card, CardBody, Text, useToast, Box, Spacer, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

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
            <Text color="purple" fontWeight={500} mt={1}>
              Deadline: {new Date(props.reminder.reminderDate).toLocaleString()}
            </Text>
          </Box>
          <Spacer />
          <Box>
            <IconButton icon={<DeleteIcon />} color="red" onClick={props.deleteReminderHandler} />
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ReminderItem;
