import React, { createContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
// import UserSessionManager from "../helpers/session.manager";
import lodash from "lodash";


const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600 shadow-none",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

export const authContext = createContext();

const loggedInUser = JSON.parse(
  localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    user: {},
    loggedIn: false,
    logOut: () => {
      localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_KEY);
      auth.updateAuth({ loggedIn: false, token: "", user: {} });
      window.location.pathname = "/login";
    },
    updateAuth: (update) => setAuth((auth) => ({ ...auth, ...update })),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lodash.isEmpty(loggedInUser?.user)) {
      auth.updateAuth({ loggedIn: false });
    } else {
      auth.updateAuth({ loggedIn: true, ...loggedInUser });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authChanged = React.useCallback(() => {
    if (auth?.user?.token) {
      if (auth.loggedIn === false) {
        localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_KEY);
      } else if (!lodash.isEqual(auth, loggedInUser)) {
        let userData = JSON.stringify(auth);
        localStorage.setItem(
          process.env.REACT_APP_LOCAL_STORAGE_KEY,
          userData
        );
      }
    }
  }, [auth]);

  useEffect(() => {
    authChanged();
  }, [auth, authChanged]);

  return (
    <authContext.Provider
      value={{
        auth,
        loading,
        setLoading,
      }}
    >
      {props.children}
      <ToastContainer
        autoClose={5000}
      />
    </authContext.Provider>
  );
};
