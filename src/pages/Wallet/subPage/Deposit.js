import React, { useState } from "react";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import { ReactComponent as Paystack } from "../../../assets/dashboard-icons/Paystack_Logo.svg";
import flutterwave from "../../../assets/dashboard-icons/flutterwave.svg";
import { ReactComponent as Lock } from "../../../assets/icons/lock.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";
import { useMutation } from "@apollo/client";
import { MAKE_PAYMENT_MUTATION } from "../../../hooks";
import Layout from "../../../component/Layout";

const Deposit = () => {
  let navigate = useNavigate();
  const [focus, setFocus] = useState("");
  const [depositAmount, setDepositAmount] = useState("0.00");

  // Add two zeros to Amount inputed
  const depositAmountPlusTrailingZeros = depositAmount + Number("0") + Number("0");
  console.log(depositAmountPlusTrailingZeros);

  //
  const [onDeposit, { data, loading, error }] = useMutation(
    MAKE_PAYMENT_MUTATION
  );

  const submit = () => {
    onDeposit({
      variables: {
        amountDeposited: Number(depositAmountPlusTrailingZeros),
      },
    }).then((res) => {
      const url = res.data.makePayment.data.authorization_url;
       window.location.replace(`${url}`);
    })
  };
  console.log(data, "deposit data")
  // if (data) {
  //   console.log(data, "daghs")
  // }
  return (
    <>
      <Layout>
        <div className="withdraw xl:h-screen h-auto">
          <div className="withdraw-container">
            <Link to="/wallet" className="back-link">
              <ArrowLeft />
              <p className="back-link_nav">Back</p>
            </Link>

            <div className="withdraw-form">
              <div>
                <p className="withdraw-form_title">
                  How much do you want to fund?
                </p>

                <div className="withdraw-form_amount-form">
                  <p className="withdraw-form_amount-form_title">
                    Deposit Amount
                  </p>

                  <label
                    className={`flex withdraw-form_amount-form_input ${
                      focus === "amt" ? "clicked" : ""
                    }`}
                  >
                    <span className="cur inline-flex items-center px-3 rounded-l-md">
                      NGN
                    </span>
                    {/* Deposit input */}
                    <input
                      type="number"
                      placeholder="0.00"
                      onFocus={() => setFocus("amt")}
                      onChange={(e) => {
                        setDepositAmount(e.target.value);
                        console.log(depositAmount, "amount to be deposited");
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="my-[32px]">
                <p className="withdraw-form_title">
                  How would you like to pay?
                </p>

                <div className="withdraw-form_amount-form">
                  <fieldset className="platforms">
                    <legend className="sr-only">paymentPlatform</legend>

                    <div
                      className={`platform platform-1 flex items-center ${
                        focus === "radio-1" ? "checked" : ""
                      }`}
                    >
                      <input
                        id="platform-option-1"
                        type="radio"
                        name="paymentPlatform"
                        className="radio-button"
                        aria-labelledby="platform-option-1"
                        aria-describedby="platform-option-1"
                        onFocus={() => setFocus("radio-1")}
                      />
                      <label
                        for="platform-option-1"
                        className="ml-2 platform-option-1"
                      >
                        <Paystack />
                      </label>
                    </div>

                    <div
                      className={`platform platform-2 flex items-center ${
                        focus === "radio-2" ? "checked" : ""
                      }`}
                    >
                      <input
                        id="platform-option-2"
                        type="radio"
                        name="paymentPlatform"
                        className="radio-button"
                        aria-labelledby="platform-option-2"
                        aria-describedby="platform-option-2"
                        onFocus={() => setFocus("radio-2")}
                      />
                      <label for="platform-option-2" className="ml-2">
                        <img src={flutterwave} alt="x" />
                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div>
                <div
                  className="withdraw-form_button flex items-center cursor-pointer justify-center"
                  type="submit"
                  onClick={() => {
                    // onContinueToPayment(data);
                    console.log("pay button clicked");
                    submit();
                    // window.location.replace(`${authorization_url}`);
                  }}
                >
                  Continue {loading && "loadng..."}
                </div>
              </div>

              <p className="withdraw-form_info-depo flex items-center">
                <Lock className="mr-[10px]" />
                You will be redirected to the third party's webpage to make this
                payment
              </p>

              <p className="withdraw-form_sub-info">
                Deposit Aeropaye token instead
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Deposit;
