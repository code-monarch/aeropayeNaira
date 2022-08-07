import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import { Link } from "react-router-dom";
import eNaira from "../../../assets/eNaira.png";
import Layout from "../../../component/Layout";

import Button from "../../../component/shared/Button";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";

import { useForm } from "react-hook-form";
import FormError from "../../../component/shared/FormError";

import { useNavigate } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { BALANCE } from "../../../hooks";
// import { REDEEM_FIAT_MUTATION } from "../../../hooks";
import { REDEEM_ENAIRA } from "../../../hooks";
import { GET_BANK_DETAILS } from "../../../hooks";

const Withdraw = () => {
  const navigate = useNavigate();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [focus, setFocus] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get balance Query
  const { data } = useQuery(BALANCE);

  // Get bank details Query
  const { data: bankDetails } = useQuery(GET_BANK_DETAILS);
  console.log("Bank Details:", bankDetails);
  const banks = bankDetails?.userBankDetails?.acctBank;
  console.log("banksss: ", banks);
  // const acctBank = bankDetails?.userBankDetails?.acctBank;
  // const acctNumber = bankDetails?.userBankDetails?.acctNumber;

  // let bankdetailsLength = Boolean(
  //   Array.isArray(bankDetails?.userBankDetails) &&
  //     bankDetails?.userBankDetails.length
  // );

  // setWalletBalance(data?.balance?.data?.data);
  let balance = data?.balance?.data?.data;
  console.log("wallet balance", data?.balance?.data?.data);
  // setWalletBalance(data?.balance?.data?.data)

  useEffect(() => {
    balance && setWalletBalance(balance);

    return () => {
      setWalletBalance();
    };
  }, [balance]);

  // Mutation for Redeeming Token to Fiat
  const [redeemEnaira, { loading: redeeming }] = useMutation(REDEEM_ENAIRA, {
    refetchQueries: [
      { query: BALANCE }, // DocumentNode object parsed with gql
      "balance", // Query name
    ],
  });

  // Handle form submit
  const submit = (data) => {
    console.log("dataaa", data);
    redeemEnaira({
      variables: {
        amount: data?.amount,
        // accountToWithdraw: data?.accountToWithdraw,
      },
    })
      .then((res) => {
        toastSuccess(`${res?.data?.redeemEnaira?.message}`);
        navigate(-1);
      })
      .catch((error) => {
        toastError(`${error?.message}`);
      });
  };

  return (
    <>
      <Layout>
        <div className="withdraw xl:h-screen !w-screen">
          <div className="withdraw-container">
            <Link to="/wallet" className="back-link">
              <ArrowLeft />
              <p className="back-link_nav">Back</p>
            </Link>

            <form onSubmit={handleSubmit(submit)} className="withdraw-form">
              <div>
                <p className="withdraw-form_title">
                  How much do you want to withdraw?
                </p>

                <div className="withdraw-form_amount-form">
                  {/* <p className="withdraw-form_amount-form_title">
                    Withdrawal Amount
                  </p> */}

                  <label
                    className={`flex withdraw-form_amount-form_input ${
                      focus === "amount" ? "clicked" : ""
                    }`}
                  >
                    <span className="cur inline-flex items-center px-3 rounded-l-md">
                      NGN
                    </span>
                    <input
                      type="text"
                      placeholder="0.00"
                      id="amount"
                      name="amount"
                      // value={() => { getValues("amount") }}
                      onFocus={() => setFocus("amount")}
                      className="input-email !pl-[5px]"
                      {...register("amount", {
                        required: "Please enter an Amount",
                      })}
                    />
                    <span
                      onClick={() => {
                        setValue(
                          "amount",
                          `${walletBalance ? walletBalance : 0}`,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          }
                        );
                      }}
                      className="max inline-flex items-center px-3 cursor-pointer"
                    >
                      MAX
                    </span>
                  </label>
                  <div className="w-[100%] flex justify-between">
                    <p className="withdraw-form_amount-form_balance">
                      Balance: ≈{" "}
                      {walletBalance && numberWithCommas(walletBalance)}{" "}
                      {!walletBalance && "0"} NGN
                    </p>
                    <FormError errors={errors} name="amount" />
                  </div>
                </div>
              </div>

              <div>
                <Button
                  className="withdraw-form_button flex items-center cursor-pointer justify-center !mt-[36px]"
                  type="submit"
                  loading={redeeming}
                  disabled={redeeming}
                >
                  Confirm Withdrawal
                </Button>
              </div>

              <p className="withdraw-form_info">
                Should arrive after 5 network confirmations
              </p>
            </form>
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

export default Withdraw;
