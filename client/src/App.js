import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
