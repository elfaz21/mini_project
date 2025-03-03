import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);
  console.log("User in PrivateRoute:", user);
  console.log("Required role:", role);

  if (!user) {
    console.log("User not authenticated, redirecting.");
    return <Navigate to="/" />;
  }

  if (user.role !== role) {
    console.log("User role mismatch, redirecting.");
    return <Navigate to="/" />;
  }

  console.log("User authorized, rendering children.");
  return children ? children : <Outlet />;
};

export default PrivateRoute;
