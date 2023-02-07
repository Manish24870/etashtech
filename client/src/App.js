import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AddReminder from "./components/AddReminder/AddReminder";
import Reminders from "./components/Reminders/Reminders";
import EditReminder from "./components/EditReminder/EditReminder";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reminders/add" element={<AddReminder />} />
          <Route path="/reminders/" element={<Reminders />} />
          <Route path="/reminders/:reminderId/edit" element={<EditReminder />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
