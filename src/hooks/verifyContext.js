import React, { createContext, useState, useRef, useEffect } from "react";
import { ToastContainer, Slide } from "react-toastify";

export const verifyContext = createContext();

export const VerifyProvider = (props) => {
  const [verify, setVerify] = useState({
    status: {},
      updateVerify: (update) => {
          setVerify((verify) => ({ ...verify, ...update }))
        verify.status.push(update)
      },
  });

  const [loading, setLoading] = useState(false);

  return (
    <verifyContext.Provider
      value={{
        verify,
        loading,
        setLoading,
      }}
    >
      {props.children}
      <ToastContainer autoClose={4000} transition={Slide} />
    </verifyContext.Provider>
  );
};
