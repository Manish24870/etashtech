import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { SocketContext } from "./context/socket";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AddReminder from "./components/AddReminder/AddReminder";
import Reminders from "./components/Reminders/Reminders";
import EditReminder from "./components/EditReminder/EditReminder";
import PrivateRoute from "./components/auth/PrivateRoute";
import { checkNotificationStatus } from "./utils/checkNotificationStatus";

const Layout = (props) => {
  const socket = useContext(SocketContext);

  // Send the notification when the task reminder date exceeds
  socket.on("jobCompleted", (data) => {
    checkNotificationStatus(`Task ${data.title} remainder`, "John");
  });

  return (
    <BrowserRouter>
      <ChakraProvider>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/reminders/add" element={<AddReminder />} />
            <Route path="/reminders/" element={<Reminders />} />
            <Route path="/reminders/:reminderId/edit" element={<EditReminder />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default Layout;
