import React, { useState } from "react";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import Button from "../../../component/shared/Button";
import eNaira from "../../../assets/eNaira.png";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ENAIRA_MINT } from "../../../hooks";

import Layout from "../../../component/Layout";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";

const Deposit = () => {
  const navigate = useNavigate();
  const [focus, setFocus] = useState("");
  const [depositAmount, setDepositAmount] = useState("0.00");

  const [enairaMint, { loading }] = useMutation(ENAIRA_MINT);

  const submit = () => {
    enairaMint({
      variables: {
        amount: Number(depositAmount),
      },
    })
      .then((res) => {
        console.log("res", res);
        toastSuccess(`${res?.data?.enairaMint?.message}`);
        navigate("/wallet");
      })
      .catch((error) => {
        toastError(`${error.message}`);
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
                  Continue to deposit
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-[16px] mt-[35px]">
              <h2 className="text-[20px]">Powered by</h2>
              <img src={eNaira} alt="eNaira logo" className="w-[150px]" />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Deposit;
