import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as Profile } from "../../assets/icons/Profile.svg";
import { ReactComponent as Email } from "../../assets/icons/email.svg";
import { ReactComponent as Password } from "../../assets/icons/password.svg";
import { ReactComponent as Hide } from "../../assets/icons/Hide.svg";
import { ReactComponent as ShowIcon } from "../../assets/icons/showIcon.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { SIGNUP_MUTATION } from "../../hooks";
import { useMutation } from "@apollo/client";
import { toastError, toastSuccess } from "../../component/shared/Toasts";
import { Controller, useForm } from "react-hook-form";
import FormError from "../../component/shared/FormError";
import { authContext } from "../../hooks/auth";
import Button from "../../component/shared/Button";
import LeftsideInfo from "./components/LeftsideInfo";
import PasswordStrength from "./components/PasswordStrength";

const SignUp = () => {
  const { auth } = useContext(authContext);

  const [showPassword, setShowPassword] = useState(false);
  const [hidePasswordHint, setHidePasswordHint] = useState(false);
  const [focus, setFocus] = useState("");

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
      fname: "",
      phone: "",
      lname: "",
      email: "",
    },
  });

  // This functions sends the form data in the Sign up mutation
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

  // This function checks is there error in form submission then sets hidePasswordHint to true
  const onError = () => setHidePasswordHint(true);

  return (
    <div className="signup-container 2xl:h-screen h-auto">
      <div className="flex justify-evenly signup-container-2">
        {/* Left side details */}
        <LeftsideInfo />
        <div>
          <div className="signup-form">
            {/* <p className="title">How do you intend to use aeropaye?</p>
            <p className="sub">
              To book flights and claim refunds for canceled flights.
            </p>
            <div className={`${error ? "error-line" : "line"}`}></div> */}
            <form onSubmit={handleSubmit(submit, onError)}>
              <div className="flex sm:flex-row flex-col">
                {/* First Name */}
                <div className="signup-form_field w-full">
                  <p className="label !mb-0 !pl-0">First Name</p>
                  <label
                    className={`flex items-center !mt-0 ${
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
                {/* First Name End */}

                {/* Last Name */}
                <div className="signup-form_field w-full ml-0 sm:ml-[16px]">
                  <p className="label !mb-0 !pl-0">Last Name</p>
                  <label
                    className={`flex items-center !mt-0 ${
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
                {/* Last Name end */}
              </div>
              {/* Email Address */}
              <div className="signup-form_field">
                <p className="label !mb-0 !pl-0 !pt-0">Email Address</p>
                <label
                  className={`flex items-center !mt-0 ${
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
              {/* Email Address End */}
              {/* Phone number */}
              <div className="signup-form_field">
                <p className="label !mb-0 !pl-0 !pt-0">Phone Number</p>
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
                        display: "inline-block",
                        marginLeft: "62px",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        borderColor: "#e1e7ec",
                        backgroundColor: "white",
                        border: "none",
                        // zIndex: "3",
                      }}
                      buttonStyle={{
                        width: "57px",
                        marginRight: "70px",
                        border: "none",
                      }}
                      className={`flex items-center !mt-0  !mb-0 border-[1px] bg-white border-[#e1e7ec] rounded-[6px] ${
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
              {/* Phone number end */}
              {/* Password */}
              <div className="signup-form_field">
                <p className="label !mb-0 !pl-0 !pt-0">Password</p>
                <label
                  className={`flex items-center !mt-0 ${
                    focus === "password-input" ? "clicked" : ""
                  }`}
                >
                  <span className="flex items-center w-auto">
                    <Password className="mr-[8px]" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="appearance-none !mt-0"
                    id="password"
                    name="password"
                    {...register("password", {
                      required: "Enter a stong password",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{8,})/,
                        message:
                          "Password should be at least 8 characters long and must contain a number, a lower and uppercase alphabet and any special character",
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
                <PasswordStrength
                  control={control}
                  hidePasswordHint={hidePasswordHint}
                />
                <FormError errors={errors} name="password" />
              </div>
              {/* Password End */}
              {/* checkBox */}
              <div className="mb-[23px]">
                <label className="flex items-center cursor-pointer">
                  <div className="flex justify-center items-center w-[30px] h-[20px] p-0 mr-[12px] border-[1px] border-[#e1e7ec] rounded-sm">
                    <input
                      type="checkbox"
                      className="appearance-none h-full w-full shadow-sm cursor-pointer"
                      id="tncCheckbox"
                      name="checkbox"
                      {...register("checkbox", {
                        required: "Please accept the terms",
                      })}
                    />
                  </div>
                  <p className="signup-field-tnc">
                    By creating an account, you agree to our{" "}
                    <span className="signup-field-tnc_item hover:underline">
                      <NavLink to="/">Terms and Conditions</NavLink>
                    </span>{" "}
                    and acknowledge our{" "}
                    <span className="signup-field-tnc_item hover:underline">
                      <NavLink to="/">Privacy policy</NavLink>
                    </span>{" "}
                  </p>
                </label>
                <FormError errors={errors} name="checkbox" />
              </div>
              {/* CheckBox end */}
              <Button
                className="login-container_login flex items-center cursor-pointer justify-center"
                type="submit"
                loading={loading && loading}
                disabled={loading && loading}
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
