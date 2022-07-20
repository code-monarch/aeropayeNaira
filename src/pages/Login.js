import React, { useContext, useState } from "react";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import { ReactComponent as Profile } from "../assets/icons/Profile.svg";
import { ReactComponent as Password } from "../assets/icons/password.svg";
import { ReactComponent as Hide } from "../assets/icons/Hide.svg";
import { ReactComponent as ShowIcon } from "../assets/icons/showIcon.svg";
import { ReactComponent as Recaptcha } from "../assets/icons/recapcha.svg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../hooks";
import { toastError, toastSuccess } from "../component/shared/Toasts";
import { useForm } from "react-hook-form";
import FormError from "../component/shared/FormError";
import { authContext } from "../hooks/auth";
import Button from "../component/shared/Button";

const Login = () => {
	const { auth } = useContext(authContext);
	const location = useLocation()
	const from = location.state?.from?.pathname || "/";
	//   const { auth, setAuth } = useAuth();

	const [showPassword, setShowPassword] = useState(false);
	const [focus, setFocus] = useState("");
	let navigate = useNavigate();

	const [login, { loading, reset }] = useMutation(LOGIN_MUTATION);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submit = (data) => {
		login({
			variables: {
				email: data.email,
				password: data.password,
			},
		})
			.then((res) => {
				const data = res?.data?.login;
				const userData = {
					loggedIn: true,
					user: { ...data?.user },
					token: data?.token,
				};
				localStorage.setItem(
					process.env.REACT_APP_LOCAL_STORAGE_KEY,
					JSON.stringify(userData)
				);
				auth.updateAuth(userData);
				toastSuccess("Login successful");
				navigate(from, { replace: true });
			})
			.catch((error) => {
				reset();
				toastError(error.message);
			});
	};

	return (
    <div className="login h-auto 2xl:h-screen">
      <NavLink to="/" className="flex justify-center login-logo">
        <Logo className="w-auto" />
      </NavLink>

      <div className="login-container">
        <p className="title">Sign into your account</p>

        <form onSubmit={handleSubmit(submit)}>
          <div className="login-container_email">
            <p className="label !mb-0 !pl-0">Email or Phone</p>
            <label
              className={`flex items-center !mt-0 ${
                focus === "email-input" ? "clicked" : ""
              }`}
            >
              <span className="flex items-center w-auto">
                <Profile className="mr-[8px]" />
              </span>
              <input
                type="text"
                placeholder="Email address or phone number"
                id="email"
                name="email"
                {...register("email", {
                  required: "Please enter a registered email or phone number",
                })}
                onBlur={() => setFocus("")}
                onFocus={() => setFocus("email-input")}
              />
            </label>
            <FormError errors={errors} name="email" />
          </div>

          <div className="login-container_email">
            <p className="label !mb-0 !pl-0 !pt-0">Password</p>
            <label
              className={`flex items-center mt-0 ${
                focus === "password-input" ? "clicked" : ""
              }`}
            >
              <span className="flex items-center w-auto">
                <Password className="mr-[8px]" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete ="true"
                onFocus={() => setFocus("password-input")}
                onBlur={() => setFocus("")}
                id="password"
                name="password"
                {...register("password", {
                  required: "Enter your password",
                })}
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

          <div className="login-container_captcha flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="appearance-none w-[20px] h-[20px] mr-[3px] bg-[#fff] rounded-sm shadow-sm border-[6px] border-slate-700 checked:bg-green cursor-pointer"
              />
              <p>I'm not a robot</p>
            </label>
            <span>
              <Recaptcha />
            </span>
          </div>

          <Button
            className="login-container_login flex items-center cursor-pointer justify-center"
            type="submit"
            loading={loading}
          >
            {loading ? "Logging in" : "Log in"}
          </Button>
        </form>
      </div>

      <div className="login-subtitle">
        <p>
          Don't have an account?{" "}
          <NavLink to="/signup" className="login-link">
            Sign Up
          </NavLink>
        </p>
        <NavLink to="/forgot-password" className="login-link">
          Forgot Password?
        </NavLink>
      </div>

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
    </div>
  );
};

export default Login;
