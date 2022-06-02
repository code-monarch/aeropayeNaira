import React, { createContext, useState, useEffect } from "react";
import { ToastContainer, Slide } from "react-toastify";
import UserSessionManager from "../helpers/session.manager";
import lodash from "lodash";

export const authContext = createContext();

const loggedInUser = JSON.parse(
  UserSessionManager.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    user: {},
    loggedIn: true,
    logOut: () => {
      localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_KEY);
      auth.updateAuth({ loggedIn: false, token: "", user: {} });
      window.location.pathname = "/";
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
    if (auth.token) {
      if (auth.loggedIn === false) {
        localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE_KEY);
      } else if (!lodash.isEqual(auth, loggedInUser)) {
        let user_data = JSON.stringify(auth);
        localStorage.setItem(
          process.env.REACT_APP_LOCAL_STORAGE_KEY,
          user_data
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
      <ToastContainer autoClose={4000} transition={Slide} />
    </authContext.Provider>
  );
};
