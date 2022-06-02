import React, { useContext } from "react";

import { Navigate, useLocation, Outlet } from "react-router-dom";
import { authContext } from "../hooks/auth";

const RequireAuth = ({ children }) => {
  const loggedInUser = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
  );
  const { loggedIn } = loggedInUser;
  const location = useLocation();

  return loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
