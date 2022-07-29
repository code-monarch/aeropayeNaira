import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { REQUEST_PASSWORD_REQUEST } from "../../hooks";
import { useMutation } from "@apollo/client";
import { ReactComponent as ArrowLeft } from "../../assets/dashboard-icons/arrow-left.svg";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as Email } from "../../assets/icons/email.svg";
import { toastError, toastSuccess } from "../../component/shared/Toasts";
import Button from "../../component/shared/Button";
import FormError from "../../component/shared/FormError";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const [resetPasswordRequest, { loading }] = useMutation(
    REQUEST_PASSWORD_REQUEST
  );
  //   const [
  //     resetPassword,
  //     { loading: loadingResetPassword, data: resetPasswordd },
  //   ] = useMutation(RESET_PASSWORD);
  const navigate = useNavigate();
  const [focus, setFocus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const submit = (data) => {
    resetPasswordRequest({
      variables: {
        email: data.email,
      },
    })
      .then((res) => {
        toastSuccess(`${res.data.status}`);
      })
      .catch((error) => {
        toastError(error.message);
      });
  };
  return (
    <div className="bg-bg min-h-screen w-screen flex justify-center pt-[80px]">
      <div className="w-[90%] xl:wrapper flex flex-col items-center">
        <div className="w-full flex justify-start mb-[50px] lg:mb-[10px]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            to="/wallet"
            className="back-link flex items-center space-x-[10px]"
          >
            <ArrowLeft />
            <button type="button" className="back-link_nav font-medium">
              Back
            </button>
          </button>
        </div>
        <Link to="/" className="mb-[30px]">
          <Logo className="w-auto" />
        </Link>
        {/* form */}
        <form
          onSubmit={handleSubmit(submit)}
          className="w-full sm:w-[465px] bg-white p-[32px] mb-[20px] shadow-card rounded-[8px]"
        >
          <div className="pb-[16px] border-[#E1E7EC] border-b-[1px] mb-[15px]">
            <h2 className="font-medium text-[18px] mb-[8px]">
              Forgot password
            </h2>
            <p className="text-[#5F6B7A] mulishFont text-[14px] pt-0 mt-0">
              Kindly enter your registered email and we&apos;ll send you a
              verification code to reset your password.{" "}
            </p>
          </div>
          <p className="label !mb-0 !pl-0">Email</p>
          <label
            className={`flex items-center h-[48px] !mt-0 pl-[15px] border-[#E1E7EC] border-[1px] rounded-[8px] ${
              focus === "email-input" ? "clicked" : ""
            }`}
          >
            <span className="w-auto">
              <Email className="mr-[8px]" />
            </span>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="appearance-none w-full h-full pl-[10px] py-[15px] rounded-[8px]"
              {...register("email", {
                required: "Please enter a valid Email",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Please enter a valid Email.",
                },
              })}
              onBlur={() => setFocus("")}
              onFocus={() => setFocus("email-input")}
            />
          </label>
          <FormError errors={errors} name="email" />
          <Button
            type="submit"
            loading={loading && loading}
            disabled={loading && loading}
            className="button mt-[23px] mb-[20px]"
          >
            Request password reset
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
