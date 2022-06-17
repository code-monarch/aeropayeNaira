import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import { ReactComponent as ArrowDown } from "../../../assets/dashboard-icons/arrow-down.svg";
import { Link } from "react-router-dom";
import Layout from "../../../component/Layout";

import Button from "../../../component/shared/Button";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";

import { useForm } from "react-hook-form";
import FormError from "../../../component/shared/FormError";

import { useNavigate } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { BALANCE } from "../../../hooks";
import { REDEEM_FIAT_MUTATION } from "../../../hooks";
import { GET_BANK_DETAILS } from "../../../hooks";

const Withdraw = () => {
  const navigate = useNavigate();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [focus, setFocus] = useState(false);
  const [walletBalance, setWalletBalance] = useState("");

  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get balance Query
  const { data } = useQuery(BALANCE);

  // Get bank details Query
  const { data: bankDetails, loading: loadingBanks } = useQuery(GET_BANK_DETAILS);
  console.log("Bank Details:", bankDetails);
  const banks = bankDetails?.userBankDetails?.acctBank;
  console.log("banksss: ", banks)
  const acctBank = bankDetails?.userBankDetails?.acctBank;
  const acctNumber = bankDetails?.userBankDetails?.acctNumber;

  let bankdetailsLength = Boolean(
    Array.isArray(bankDetails?.userBankDetails) &&
      bankDetails?.userBankDetails.length
  );

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
  const [
    redeemFiat,
    { data: redeemData, loading: redeeming, error: redeemError },
  ] = useMutation(REDEEM_FIAT_MUTATION, {
    refetchQueries: [
      { query: BALANCE }, // DocumentNode object parsed with gql
      "balance", // Query name
    ],
  });

  // Handle form submit
  const submit = (data) => {
    console.log("dataaa", data)
    redeemFiat({
      variables: {
        amount: data?.amount,
        accountToWithdraw: data?.accountToWithdraw,
      },
    })
    .then((res) => {
      toastSuccess(`${res?.data?.redeemFiat?.message}`);
      navigate(-1)      
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
                  <p className="withdraw-form_amount-form_title">
                    Withdrawal Amount
                  </p>

                  <label
                    className={`flex withdraw-form_amount-form_input ${
                      focus ? "clicked" : ""
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
                      onFocus={() => setFocus(true)}
                      className="input-email"
                      {...register("amount", {
                        required: "Please enter Amount",
                      })}
                    />
                    <span
                      onClick={() => {
                        setValue(
                          "amount",
                          `${walletBalance && walletBalance}`,
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

              <div className="mt-[36px] mb-[32px]">
                <p className="withdraw-form_title">
                  How would you like to get paid?
                </p>

                <div className="withdraw-form_amount-form">
                  <p className="withdraw-form_amount-form_title">
                    Select Withdrawal Account
                  </p>

                  <button
                    id="dropdownButton"
                    name="accountToWithdraw"
                    data-dropdown-toggle="dropdown"
                    {...register("accountToWithdraw", {
                      required: "Please select bank details",
                    })}
                    className="withdraw-form_amount-form_dropdown px-4 py-2.5 text-center inline-flex items-center justify-between"
                    type="button"
                  >
                    {/* {loadingBanks && "Getting bank details..."} */}
                    {bankdetailsLength === false && "No bank records found"}
                    {bankDetails && "Select bank"}
                    <ArrowDown />
                  </button>
                  <div className="w-[100%] flex justify-end">
                    <FormError errors={errors} name="accountToWithdraw" />
                  </div>
                  <div
                    id="dropdown"
                    className="hidden z-10 overflow-auto list-none bg-white rounded divide-y divide-gray-100 shadow-md"
                  >
                    <ul className="py-1" aria-labelledby="dropdownButton">
                      {bankDetails?.userBankDetails?.map((bank, index) => (
                        <li
                          key={index}
                          className="block w-[100%] text-left py-2 px-4 text-sm text-[#212934] hover:bg-[#F0FFFC] cursor-pointer"
                          onClick={() => {
                            setValue(
                              "accountToWithdraw",
                              `${bank.acctNumber}`,
                              {
                                shouldValidate: true,
                                shouldDirty: true,
                              }
                            );
                            // setSelectedBank(bank);
                          }}
                        >
                          {`${bank.acctBank}:`}&nbsp;{bank.acctNumber}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <button
                    id="dropdownButton"
                    data-dropdown-toggle="dropdown"
                    className="withdraw-form_amount-form_dropdown px-4 py-2.5 text-center inline-flex items-center justify-between"
                    type="button"
                  >
                    Firstbank - 0000000000
                    <ArrowDown />
                  </button>
                  <div
                    id="dropdown"
                    className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
                  >
                    <ul className="py-1" aria-labelledby="dropdownButton">
                      <li>
                          Dashboard
                      </li>
                      <li>
                          Settings
                      </li>
                      <li>
                          Earnings
                      </li>
                      <li>
                          Sign out
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>

              <div>
                <Button
                  className="withdraw-form_button flex items-center cursor-pointer justify-center"
                  type="submit"
                  loading={redeeming}
                  disabled={redeeming}
                >
                  Confirm Withdrawal
                </Button>
              </div>

              <p className="withdraw-form_info">
                Should arrive within 1-2 business days
              </p>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Withdraw;
