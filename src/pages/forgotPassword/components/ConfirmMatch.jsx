import React from "react";
import { useWatch } from "react-hook-form";

const ConfirmMatch = ({ control }) => {
  const password = useWatch({
    control,
    name: "password",
  });
  console.log("PASSWORD", password);

  const confirmPassword = useWatch({
    control,
    name: "confirmPassword",
  });
  console.log("confirmPassword", confirmPassword);


  return (
    <>
      <div
        className={`${
          confirmPassword
            ? "block transition-all ease-in-out delay-150"
            : "hidden"
        }`}
      >
        <div className="text-[12px] mt-[5px]">
          {password !== confirmPassword || confirmPassword === "" ? (
            <p className="text-red-500">Password doesn't match</p>
          ) : (
            <p className="text-lime-600">Password match</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmMatch;
