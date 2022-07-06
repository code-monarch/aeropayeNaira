import React,{ createContext, useState } from "react";
import { ToastContainer, Slide } from "react-toastify";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
      <ToastContainer autoClose={4000} transition={Slide} />
    </AuthContext.Provider>
  );
};

export default AuthContext;
