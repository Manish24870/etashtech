import {
  Flex,
  Card,
  CardBody,
  Button,
  Heading,
  Text,
  useToast,
  Box,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const ReminderItem = (props) => {
  return (
    <Card mb={4} variant="filled">
      <CardBody>
        <Flex align="center">
          <Box>
            <Text fontSize="lg" fontWeight={500}>
              Play Piano
            </Text>
            <Text>I need to play the piano in this time</Text>
            <Text color="purple" fontWeight={500} mt={1}>
              Deadline: {new Date().toLocaleDateString()}
            </Text>
          </Box>
          <Spacer />
          <Box>
            <IconButton icon={<DeleteIcon />} color="red" />
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ReminderItem;
