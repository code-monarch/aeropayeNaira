import React from 'react'
import { Link } from "react-router-dom";

const VerifyEmailText = () => {
  return (
    <Link
      to="/verify-email"
      className="font-sans text-black text-[14px] flex justify-center items-center bg-bg py-[10px] transition-all ease-out duration-700"
    >
      Verify your Email address to book flights
    </Link>
  );
}

export default VerifyEmailText