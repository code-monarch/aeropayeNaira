import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import Button from "../../component/shared/Button";
import { toastError, toastSuccess } from "../../component/shared/Toasts";
import { useMutation } from "@apollo/client";
import { SEND_EMAIL_VERIFICATION } from "../../hooks";
import { NavLink, useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [statusState, setStatusState] = useState();
  const [
    sendEmailVerification,
    { data: emailData, loading: sendingEmail, error: errorSending },
  ] = useMutation(SEND_EMAIL_VERIFICATION);

  return (
    <div className="w-[100vw] h-[100vh] bg-bg flex flex-col pt-[64px] justify-top items-center">
      {console.log("Status State", statusState)}
      <NavLink to="/" className="signup-logo mb-[32px]">
        <Logo className="w-auto" />
      </NavLink>
      {/* Body Container */}
      <div className="bg-white flex flex-col justify-center items-center h-[200px] w-[300px] px-[32px] mb-[64px] rounded-[8px] shadow-sm">
        <h2 className="mb-[16px] font-[500] text-black">Email not verified</h2>
        <Button
          onClick={() => {
            sendEmailVerification()
              .then((res) => {
                console.log("Email verification response", res);
                // setStatusState(res?.data?.sendEmailVerification?.status);
                toastSuccess(`${res?.data?.sendEmailVerification?.message}`);
                navigate(-1);
              })
              .catch((error) => {
                console.log("Email verification Error", error);
                toastError(`${error?.errors?.message}`);
              });
          }}
          loading={sendingEmail}
          disabled={sendingEmail || emailData}
          className="bg-green text-black w-full font-[400] mb-[16px] px-[16px] py-[8px] flex items-center cursor-pointer justify-center whitespace-nowrap rounded-[6px]"
        >
          {sendingEmail ? "sending verification email" : "Verify Email"}
        </Button>
        <h3 className="text-[12px] text-gray">We'll send you a mail</h3>
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

export default ConfirmEmail;
