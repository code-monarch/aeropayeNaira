import React, { useState, useEffect, useCallback, useContext } from "react";
import { useQuery } from "@apollo/client";
import { USER_VERIFICATION_STATUS } from "../hooks";

const EmailVerifStatusContext = React.createContext();

export const EmailVerifStatusProvider = ({ children }) => {
  // User verification status
  const { data } = useQuery(USER_VERIFICATION_STATUS);
  const [verifStatus, setVerifStatus] = useState(true);

  // Store VerificationStatus in variable
  const verificationStatus = data?.userVerificationStatus;
  console.log("Email verification status: ", verificationStatus);

  useEffect(() => {
    if (verificationStatus === true) {
      setVerifStatus((verifStatus) => true);
    } else if (verificationStatus === false) {
      setVerifStatus((verifStatus) => false);
    } else if (verificationStatus === undefined) {
      setVerifStatus((verifStatus) => true);
    }
  }, [verificationStatus]);

  return (
    <EmailVerifStatusContext.Provider value={verifStatus}>
      {children}
    </EmailVerifStatusContext.Provider>
  );
};

export const useVerifEmailStatus = () => {
  const store = useContext(EmailVerifStatusContext);
  return store;
};

export default useVerifEmailStatus;
