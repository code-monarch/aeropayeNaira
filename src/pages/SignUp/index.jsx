import React, { useState, useContext } from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { NavLink } from "react-router-dom";
import { ReactComponent as Tick } from "../../assets/icons/tick-circle.svg";
import { ReactComponent as Profile } from "../../assets/icons/Profile.svg";
import { ReactComponent as Email } from "../../assets/icons/email.svg";
import { ReactComponent as Password } from "../../assets/icons/password.svg";
import { ReactComponent as Hide } from "../../assets/icons/Hide.svg";
import { ReactComponent as ShowIcon } from "../../assets/icons/showIcon.svg";
import { ReactComponent as AirlineName } from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
// import "react-phone-input-2/lib/style.css";
import { SIGNUP_MUTATION } from "../../hooks";
import { useMutation } from "@apollo/client";
import { toastError, toastSuccess } from "../../component/shared/Toasts";
import { Controller, useForm } from "react-hook-form";
import FormError from "../../component/shared/FormError";
// import useAuth from "../../hooks/useAuth";
import { authContext } from "../../hooks/auth";
import Button from "../../component/shared/Button";
import { RiContrastDropLine } from "react-icons/ri";

const SignUp = () => {
  // const { auth, setAuth } = useAuth();
  // console.log("auth context", auth)
  const { auth } = useContext(authContext);

  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState("");
  const [error, setError] = useState(false);

  let navigate = useNavigate();

  const [signup, { loading, data: signupData, reset }] =
    useMutation(SIGNUP_MUTATION);

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

  const submit = (data) => {
    signup({
      variables: {
        firstname: data.fname,
        lastname: data.lname,
        mobile: data.phone,
        email: data.email,
        password: data.password,
      },
    })
      .then(({ data }) => {
        // const data = res?.data?.signup?.user;
        console.log("response", data);
        const userData = {
          user: data?.signup?.user,
          token: data?.signup?.token,
          account_type: "individual",
          phone: data?.signup?.user?.mobile,
        };
        // setAuth({userData});
        localStorage.setItem(
          process.env.REACT_APP_LOCAL_STORAGE_KEY,
          JSON.stringify(userData)
        );
        auth.updateAuth(userData);
        toastSuccess("User created succesfully");
        navigate("/2FA");
      })
      .catch((error) => {
        reset();
        toastError(error.message);
        // return loader && loader.current?.complete();
      });
  };

  console.log("Mutation data", signupData);

  return (
    <div className="signup-container 2xl:h-screen h-auto">
      <div className="flex justify-evenly signup-container-2">
        <div className="signup">
          <NavLink to="/" className="signup-logo">
            <Logo className="w-auto" />
          </NavLink>
          <div>
            <div className="flex signup-details">
              <div className="signup-details_icon">
                <Tick />
              </div>

              <div>
                <p className="signup-details_title">
                  Tokenized ticketing system
                </p>
                <p className="signup-details_subtitle">
                  Aeropaye convert a Tokenized Tickets digit into a digital
                  credential that can't be stolen or reused.{" "}
                </p>
              </div>
            </div>

            <div className="flex signup-details">
              <div className="signup-details_icon">
                <Tick />
              </div>
              <div>
                <p className="signup-details_title">Autonomous refund engine</p>
                <p className="signup-details_subtitle">
                  On cancelling or delaying the Flight, Aeropaye will process
                  refund within seconds from the time of delayed or cancelled
                  flight.
                </p>
              </div>
            </div>

            <div className="flex signup-details items-start">
              <div className="signup-details_icon">
                <Tick />
              </div>
              <div>
                <p className="signup-details_title">
                  Blockchain smart contract secured
                </p>
                <p className="signup-details_subtitle">
                  Aeropaye Smart contracts improve the time-consuming processes
                  in travellers refund claims adjudication to cut cost for
                  Airlines.{" "}
                </p>
              </div>
            </div>
            <div className="flex signup-details">
              <div className="signup-details_icon">
                <Tick />
              </div>
              <div>
                <p className="signup-details_title">
                  Access to exclusive discounts
                </p>
                <p className="signup-details_subtitle">
                  Aeropaye Offers exclusive discounts.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="signup-form">
            <p className="title">How do you intend to use aeropaye?</p>
            <p className="sub">
              To book flights and claim refunds for canceled flights.
            </p>

            <div className={`${error ? "error-line" : "line"}`}></div>
            <form onSubmit={handleSubmit(submit)}>
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
                      className="appearance-none"
                      {...register("fname", {
                        required: "Please enter your first name",
                        pattern: {
                          value: /^[a-zA-Z]*$/,
                          message: "Name must not contain numbers.",
                        },
                      })}
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
                        pattern: {
                          value: /^[a-zA-Z]*$/,
                          message: "Name must not contain numbers.",
                        },
                      })}
                      placeholder=""
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
                    placeholder=""
                    id="email"
                    name="email"
                    className="appearance-none"
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
                      inputStyle={{
                        marginLeft: "50px",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        paddingLeft: "10px",
                      }}
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
                    className="appearance-none"
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
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="appearance-none w-[20px] h-[20px] mr-[12px] bg-bg rounded-sm shadow-sm border-[1px] border-black cursor-pointer"
                    id="tncCheckbox"
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
    </div>
  );
};

export default SignUp;
