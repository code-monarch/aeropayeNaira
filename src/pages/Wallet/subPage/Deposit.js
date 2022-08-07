import React, { useState } from "react";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import { ReactComponent as Paystack } from "../../../assets/dashboard-icons/Paystack_Logo.svg";
import flutterwave from "../../../assets/dashboard-icons/flutterwave.svg";
import { ReactComponent as Lock } from "../../../assets/icons/lock.svg";
import Button from "../../../component/shared/Button";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
// import { MAKE_PAYMENT_MUTATION } from "../../../hooks";
import { ENAIRA_MINT } from "../../../hooks";

import Layout from "../../../component/Layout";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";

const Deposit = () => {
  const [focus, setFocus] = useState("");
  const [depositAmount, setDepositAmount] = useState("0.00");

  // Add two zeros to Amount inputed
  const depositAmountPlusTrailingZeros =
    depositAmount + Number("0") + Number("0");
  console.log(depositAmountPlusTrailingZeros);

  //
  // const [makePayment, { loading }] = useMutation(MAKE_PAYMENT_MUTATION);
  const [enairaMint, { loading }] = useMutation(ENAIRA_MINT);

  const submit = () => {
    enairaMint({
      variables: {
        amount: Number(depositAmountPlusTrailingZeros),
      },
    })
      .then((res) => {
        console.log("res", res);
        toastSuccess(`${res?.data?.enairaMint?.message}`);
      })
      .catch((error) => {
        toastError(error);
      });
  };
  return (
    <>
      <Layout>
        <div className="withdraw xl:h-screen w-screen h-auto">
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
                    <span className="cur inline-flex items-center px-3 mr-[8px] rounded-l-md">
                      NGN
                    </span>
                    {/* Deposit input */}
                    <input
                      type="number"
                      className="!appearance-none rounded-r-[6px]"
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

              <div>
                <Button
                  className="withdraw-form_button flex items-center cursor-pointer justify-center !mt-[36px]"
                  loading={loading}
                  onClick={() => {
                    submit();
                  }}
                >
                  Continue
                </Button>
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
