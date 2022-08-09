import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children, ...props}) => {
  return (props.isLoggedIn ? children : <Navigate to="/signin"/>);
}

export default ProtectedRoute;