import React, { useEffect, useRef } from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { useMutation } from "@apollo/client";
import { toastError, toastSuccess } from "../../component/shared/Toasts";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { VERIFY_EMAIL } from "../../hooks";

const EmailToken = () => {
  const navigate = useNavigate();
  let statusRef = useRef(null);
  const [verifyUser] = useMutation(VERIFY_EMAIL);
  let { token } = useParams();
  console.log("Email Token:", token);
  //   let status = statusRef.current
  useEffect(() => {
    if (token) {
      verifyUser()
        .then((res) => {
          console.log("verify response", res?.data?.verifyUser);
          statusRef.current = res?.data?.verifyUser;
          console.log("statusRef", statusRef.current);
          //   const status = res?.data?.verifyUser;
          if (statusRef.current === true) {
            toastSuccess(`${"Email verification successful"}`);
            navigate("/")
          } else {
            toastError(`${"Email verification Failed"}`);
          }
        })
        .catch((error) => {
          toastError(`${error}`);
          console.log("verify error", error);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-bg h-[100vh] w-[100vw] flex flex-col pt-[64px] justify-top items-center">
      <NavLink to="/" className="signup-logo mb-[32px]">
        <Logo className="w-auto" />
      </NavLink>
      {/* Body Container */}
      <div className="bg-white flex flex-col justify-center items-center h-[200px] w-[300px] px-[32px] mb-[64px] rounded-[8px] shadow-sm">
        <h2 className="mb-[16px] font-[500] text-black">
          {(statusRef.current = false && "Email verification failed")}
          {(statusRef.current = true && "Email Verification Successful")}
        </h2>
        <NavLink
          to="/"
          className="bg-green text-black w-full font-[400] px-[16px] py-[8px] flex items-center cursor-pointer justify-center whitespace-nowrap rounded-[6px]"
        >
          Return Home
        </NavLink>
      </div>
      {/* Body Container End */}

      {/* Footer links */}
      <div className="flex sm:flex-row flex-col justify-center items-center login-footer-link">
        <p className="login-footer-link_item my-2 sm:my-0">
          &copy; 2022 - Aeropaye
        </p>
        <NavLink to="/" className="login-footer-link_item my-2 sm:my-0">
          Terms and Conditions
        </NavLink>
        <NavLink to="/" className="login-footer-link_item my-2 sm:my-0">
          Privacy policy
        </NavLink>
        <NavLink to="/" className="login-footer-link_item my-2 sm:my-0">
          Contact us
        </NavLink>
      </div>
      {/* Footer links End */}
    </div>
  );
};

export default EmailToken;
