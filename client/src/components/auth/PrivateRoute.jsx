import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Spinner } from "@chakra-ui/react";

const PrivateRoute = ({ auth }) => {
  const location = useLocation();
  const token = localStorage.getItem("jwt");
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
