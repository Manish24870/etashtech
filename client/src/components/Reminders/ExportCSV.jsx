import { Menu, MenuList, MenuItem, MenuButton, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ExportToCsv } from "export-to-csv";

const ExportCSV = (props) => {
  // Map the reminders to specified required download formats
  let reminderTitles = [];
  let reminderDates = [];
  let reminderBoth = [];
  props.reminders.forEach((reminder) => {
    reminderTitles.push({ title: reminder.title });
    reminderDates.push({ date: new Date(reminder.reminderDate).toLocaleString() });
    reminderBoth.push({
      title: reminder.title,
      date: new Date(reminder.reminderDate).toLocaleString(),
    });
  });

  // When user wants to export titles only
  const exportTitlesHandler = () => {
    const csvExporter = new ExportToCsv({
      headers: ["Titles"],
      showLabels: true,
      filename: "reminderTitles",
    });
    csvExporter.generateCsv(reminderTitles);
  };

  // When user wants to export dates only
  const exportDatesHandler = () => {
    const csvExporter = new ExportToCsv({
      headers: ["Reminder Dates"],
      showLabels: true,
      filename: "reminderDates",
    });
    csvExporter.generateCsv(reminderDates);
  };

  // When user wants to expoort titles and dates
  const exportBothHandler = () => {
    const csvExporter = new ExportToCsv({
      headers: ["Titles", "Date"],
      showLabels: true,
      filename: "reminders",
    });
    csvExporter.generateCsv(reminderBoth);
  };

  return (
    <Menu>
      <MenuButton as={Button} size="sm" rightIcon={<ChevronDownIcon />} color="blue">
        Export CSV
      </MenuButton>
      <MenuList>
        <MenuItem onClick={exportTitlesHandler}>Export Titles</MenuItem>
        <MenuItem onClick={exportDatesHandler}>Export Dates</MenuItem>
        <MenuItem onClick={exportBothHandler}>Export Both</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ExportCSV;
