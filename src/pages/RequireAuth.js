import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../hooks/auth";

export const RequireAuth = ({ children }) => {
  const user = useContext(authContext);
  const isLoggedIn = user.auth.loggedIn;
  console.log(isLoggedIn, "auth user");
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};
