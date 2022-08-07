import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const loggedInUser = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
  );
  const location = useLocation();
  console.log(loggedInUser);

  return (
    <>
      {loggedInUser?.token && children}
      {!loggedInUser?.token && (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
