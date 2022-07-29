import React, { useState, useEffect } from "react";
import {useWatch } from "react-hook-form";

const PasswordStrength = ({ control, hidePasswordHint }) => {
  const [passwordStrength, setPasswordStrength] = useState();
  const password = useWatch({
    control,
    name: "password",
  });
  console.log("PASSWORD", password);

  useEffect(() => {
    const easyPasswordStrengthRegex = new RegExp(
      /^(?=.*[a-zA-Z0-9!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{1,})/
    );
    const mediumPasswordStrengthRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{7,9})/
    );
    const strongPasswordStrengthRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{10,})/
    );
    if (strongPasswordStrengthRegex.test(password)) {
      setPasswordStrength(3);
      console.log("Password stregth: Valid");
    } else if (mediumPasswordStrengthRegex.test(password)) {
      setPasswordStrength(2);
    } else if (easyPasswordStrengthRegex.test(password)) {
      setPasswordStrength(1);
    }
    console.log("PASSWORD STRENGTH", passwordStrength);
  }, [password, passwordStrength]);

  return (
    <>
      <div
        className={`${
          password ? "block transition-all ease-in-out delay-150" : "hidden"
        }`}
      >
        <div className="text-[12px] mt-[5px]">
          Password strength:{" "}
          <span
            className={`${passwordStrength === 1 && "text-red-500"} ${
              passwordStrength === 2 && "text-amber-500"
            } ${passwordStrength === 3 && "text-lime-600"} font-medium`}
          >
            {passwordStrength === 1 && "Weak"}{" "}
            {passwordStrength === 2 && "Moderate"}{" "}
            {passwordStrength === 3 && "Strong"}
          </span>
          {/* {hidePasswordHint ? (
            ""
          ) : (
            <p className="text-[12px] mt-[5px]">
              Hint: Password should be at least 8 characters long and must contain a number, a
              lower and uppercase alphabet and any special character
            </p>
          )} */}
        </div>
      </div>
    </>
  );
};

export default PasswordStrength