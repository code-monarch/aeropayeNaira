import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RESET_PASSWORD } from "../../hooks";
import { useMutation } from "@apollo/client";
import { ReactComponent as ArrowLeft } from "../../assets/dashboard-icons/arrow-left.svg";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as Password } from "../../assets/icons/password.svg";
import { ReactComponent as Hide } from "../../assets/icons/Hide.svg";
import { ReactComponent as ShowIcon } from "../../assets/icons/showIcon.svg";
import { toastError, toastSuccess } from "../../component/shared/Toasts";
import Button from "../../component/shared/Button";
import FormError from "../../component/shared/FormError";
import PasswordStrength from "../SignUp/components/PasswordStrength";
import ConfirmMatch from "./components/ConfirmMatch";
import { useForm, useWatch } from "react-hook-form";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [focus, setFocus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hidePasswordHint, setHidePasswordHint] = useState(false);
  const [
    resetPassword,
    { loading: loadingResetPassword, data: resetPasswordd },
  ] = useMutation(RESET_PASSWORD);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const passwordInput = useWatch({
    control,
    name: "password",
  });
  console.log("PASSWORD", passwordInput);

  const confirmPasswordInput = useWatch({
    control,
    name: "confirmPassword",
  });
  console.log("confirmPassword", confirmPasswordInput);

  const submit = (data) => {
    if (passwordInput === confirmPasswordInput) {
      resetPassword({
        variables: {
          newPassword: data.password,
        },
      })
        .then((res) => {
          toastSuccess(`${res.errors.message}`);
          navigate("/login")
        //   toastSuccess(`${res.data.status}`);
        })
        .catch((error) => {
          toastError(error.message);
        });
    } else {
      toastError("Password doesn't match");
    }
  };

  // This function checks is there error in form submission then sets hidePasswordHint to true
//   const onError = () => setHidePasswordHint(true);
  return (
    <div className="bg-bg min-h-screen w-full overflow-x-hidden flex justify-center pt-[80px]">
      <div className="w-[90%] xl:wrapper flex flex-col items-center">
        {/* <div className="w-full flex justify-start mb-[50px] lg:mb-[10px]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="back-link flex items-center space-x-[10px]"
          >
            <ArrowLeft />
            <button type="button" className="back-link_nav font-medium">
              Back
            </button>
          </button>
        </div> */}
        <Link to="/" className="mb-[30px]">
          <Logo className="w-auto" />
        </Link>
        {/* form */}
        <form
          onSubmit={
            handleSubmit(submit)}
          className="w-full sm:w-[465px] bg-white p-[32px] mb-[20px] shadow-card rounded-[8px]"
        >
          <div className="pb-[16px] border-[#E1E7EC] border-b-[1px] mb-[15px]">
            <h2 className="font-medium text-[18px]">Enter a new password.</h2>
            {/* <p className="text-[#5F6B7A] mulishFont text-[14px] pt-0 mt-0">
              Enter a new password.
            </p> */}
          </div>
          {/* Password */}
          <div className="mb-[15px]">
            {" "}
            <p className="label !mb-0 !pl-0">New Password</p>
            <label
              className={`flex items-center h-[48px] !mt-0 px-[15px] border-[#E1E7EC] border-[1px] rounded-[8px] ${
                focus === "password-input" ? "clicked" : ""
              }`}
            >
              <span className="w-auto">
                <Password className="mr-[8px]" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="appearance-none w-full !mt-0"
                id="password"
                name="password"
                {...register("password", {
                  required: "Enter password",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{8,})/,
                    message:
                      "Password should be at least 8 characters long and must contain a number, a lower and uppercase alphabet and any special character",
                  },
                })}
                onBlur={() => setFocus("")}
                onFocus={() => setFocus("password-input")}
              />{" "}
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
          {/* Confirm Password */}
          <p className="label !mb-0 !pl-0">Confirm Password</p>
          <label
            className={`flex items-center h-[48px] !mt-0 px-[15px] border-[#E1E7EC] border-[1px] rounded-[8px] ${
              focus === "confirmPassword-input" ? "clicked" : ""
            }`}
          >
            <span className="w-auto">
              <Password className="mr-[8px]" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="appearance-none w-full !mt-0"
              id="confirmPassword"
              name="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{8,})/,
                  message:
                    "Confirm Password",
                },
              })}
              onBlur={() => setFocus("")}
              onFocus={() => setFocus("confirmPassword-input")}
            />{" "}
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
          {/* Confirm Password End */}
          <ConfirmMatch control={control} />
          {/* <FormError errors={errors} name="confirmPassword" /> */}
          <Button
            type="submit"
            loading={loadingResetPassword}
            disabled={loadingResetPassword}
            className="button mt-[30px] mb-[20px]"
          >
            Confirm Password Change
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
