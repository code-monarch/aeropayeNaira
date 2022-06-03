import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const loggedInUser = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
  );
  const location = useLocation();

  return loggedInUser?.token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
