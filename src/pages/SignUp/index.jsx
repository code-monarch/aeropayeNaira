import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LeftsideInfo from "./components/LeftsideInfo";
import "../../styles/main.css";

import { ReactComponent as Profile } from "../../assets/icons/Profile.svg";
import { ReactComponent as Email } from "../../assets/icons/email.svg";
import { ReactComponent as Password } from "../../assets/icons/password.svg";
import { ReactComponent as Hide } from "../../assets/icons/Hide.svg";
import { ReactComponent as ShowIcon } from "../../assets/icons/showIcon.svg";

import Button from "../../component/shared/Button";

//  A React component to format phone numbers
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { SIGNUP_MUTATION } from "../../hooks";
import { useMutation } from "@apollo/client";

// React package to make notification easy
import { toastError, toastSuccess } from "../../component/shared/Toasts";

// react-hooks-useform` implements React hooks to enable a complete, lightweight form implementation for React
import { Controller, useForm } from "react-hook-form";
import FormError from "../../component/shared/FormError";

import { authContext } from "../../hooks/auth";

const SignUp = () => {
  const { auth } = useContext(authContext);
  console.log(auth);

  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState("");
  const [error, setError] = useState(false);

  let navigate = useNavigate();

  const [signup, { loading, reset }] = useMutation(SIGNUP_MUTATION);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  //   Handle Form Submit
  // Dispatch signup mutation containing user info to server
  const userFormSubmit = (data) => {
    signup({
      variables: {
        firstname: data.fname,
        lastname: data.lname,
        mobile: data.phone,
        email: data.email,
        password: data.password,
      },
    })
      .then((res) => {
        const data = res?.data?.signup;
        const user_data = {
          user: { ...data?.user },
          account_type: "individual",
        };
        localStorage.setItem(
          process.env.REACT_APP_LOCAL_STORAGE_KEY,
          JSON.stringify(user_data)
        );
        auth.updateAuth(user_data);
        toastSuccess("User created succesfully");
        // history.push(`/2FA`);
        navigate("verify");
        
      })
      .catch((error) => {
        reset();
        toastError(error.message);
      });
  };

  return (
    <div className="signup-container 2xl:h-screen h-auto">
      <div className="flex justify-evenly signup-container-2">
        {/* Left side */}
        <LeftsideInfo />

        {/* Right Side */}
        <div>
          <div className="signup-form">
            <p className="title">How do you intend to use aeropaye?</p>
            <p className="sub">
              To book flights and claim refunds for canceled flights.
            </p>

            {/* divider */}
            <div className={`${error ? "error-line" : "line"}`}></div>
            {/* Sign Up Form */}
            <form onSubmit={handleSubmit(userFormSubmit)}>
              <div className="flex sm:flex-row flex-col">
                <div className="signup-form_field w-full">
                  <p className="label">First Name</p>
                  <label
                    className={`flex items-center ${
                      focus === "fname-input" ? "clicked" : ""
                    }`}
                  >
                    <span className="w-auto">
                      <Profile className="mr-[8px]" />
                    </span>
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      {...register("fname", {
                        required: "Please enter your first name",
                      })}
                      placeholder="John"
                      onBlur={() => setFocus("")}
                      onFocus={() => setFocus("fname-input")}
                    />
                  </label>
                  <FormError errors={errors} name="fname" />
                </div>

                <div className="signup-form_field w-full ml-0 sm:ml-[16px]">
                  <p className="label">Last Name</p>
                  <label
                    className={`flex items-center ${
                      focus === "lname-input" ? "clicked" : ""
                    }`}
                  >
                    <span className="w-auto">
                      <Profile className="mr-[8px]" />
                    </span>
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      {...register("lname", {
                        required: "Please enter your last name",
                      })}
                      placeholder="Doe"
                      onBlur={() => setFocus("")}
                      onFocus={() => setFocus("lname-input")}
                    />
                  </label>
                  <FormError errors={errors} name="lname" />
                </div>
              </div>

              <div className="signup-form_field">
                <p className="label">Email Address</p>
                <label
                  className={`flex items-center ${
                    focus === "email-input" ? "clicked" : ""
                  }`}
                >
                  <span className="flex items-center w-auto">
                    <Email className="mr-[8px]" />
                  </span>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    id="email"
                    name="email"
                    {...register("email", {
                      required: "Please enter a valid email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Please enter a valid email.",
                      },
                    })}
                    onBlur={() => setFocus("")}
                    onFocus={() => setFocus("email-input")}
                  />
                </label>
                <FormError errors={errors} name="email" />
              </div>

              <div className="signup-form_field">
                <p className="label">Phone Number</p>

                <Controller
                  control={control}
                  id="phone"
                  name="phone"
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      country={"ng"}
                      onChange={onChange}
                      value={value}
                      className={`flex items-center ${
                        focus === "phone-input" ? "clicked" : ""
                      }`}
                      onBlur={() => setFocus("")}
                      onFocus={() => setFocus("phone-input")}
                    />
                  )}
                  rules={{
                    required: "Enter a valid number",
                  }}
                />
                <FormError errors={errors} name="phone" />
              </div>

              <div className="signup-form_field">
                <p className="label">Password</p>
                <label
                  className={`flex items-center ${
                    focus === "password-input" ? "clicked" : ""
                  }`}
                >
                  <span className="flex items-center w-auto">
                    <Password className="mr-[8px]" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    name="password"
                    {...register("password", {
                      required: "Enter a stong password",
                      minLength: {
                        value: 8,
                        message:
                          "Password should be at least 8 characters long",
                      },
                    })}
                    onBlur={() => setFocus("")}
                    onFocus={() => setFocus("password-input")}
                  />

                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <ShowIcon className="h-[12.75px] w-[15px]" />
                    ) : (
                      <Hide className="h-[12.75px] w-[15px]" />
                    )}
                  </span>
                </label>
                <FormError errors={errors} name="password" />
              </div>

              <div className="mb-[23px]">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    className="signup-field-checkbox"
                    id="checkbox"
                    name="checkbox"
                    {...register("checkbox", {
                      required: "Please accept the terms",
                    })}
                  />
                  <p className="signup-field-tnc">
                    By creating an account, you agree to our{" "}
                    <span className="signup-field-tnc_item">
                      <NavLink to="/">Terms and Conditions</NavLink>
                    </span>{" "}
                    and acknowledge our{" "}
                    <span className="signup-field-tnc_item">
                      <NavLink to="/">Privacy policy</NavLink>
                    </span>{" "}
                  </p>
                </label>
                <FormError errors={errors} name="checkbox" />
              </div>

              <Button
                className="login-container_login flex items-center justify-center cursor-pointerjustify-center"
                type="submit"
                loading={loading}
              >
                Create account
              </Button>
            </form>
          </div>

          {/* Sign Up Form End */}

          <div className="login-subtitle mt-[32px]">
            <p>
              Already have an account?{" "}
              <NavLink to="/login" className="login-link">
                Log in
              </NavLink>
            </p>
          </div>
        </div>
      </div>

      {/* Sign-up Footer */}
      <div className="flex sm:flex-row flex-col items-center login-footer-link signup-footer">
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
      {/* Sign-up Footer End */}
      {/* Right Side End */}
    </div>
  );
};

export default SignUp;
