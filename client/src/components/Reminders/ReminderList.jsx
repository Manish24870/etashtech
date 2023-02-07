import { Box } from "@chakra-ui/react";
import ReminderItem from "./ReminderItem";

const ReminderList = (props) => {
  let filteredReminders = [...props.reminders];
  if (props.searchText !== "") {
    filteredReminders = filteredReminders.filter(
      (reminder) =>
        reminder.title.toLowerCase().includes(props.searchText) ||
        reminder.reminderDate.includes(props.searchText)
    );
  }

  return (
    <Box>
      {filteredReminders.map((reminder) => (
        <ReminderItem
          key={reminder._id}
          deleteReminderHandler={() => props.deleteReminderHandler(reminder._id)}
          reminder={reminder}
        />
      ))}
    </Box>
  );
};

export default ReminderList;
