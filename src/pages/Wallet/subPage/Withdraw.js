import React, { useState } from "react";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import { ReactComponent as ArrowDown } from "../../../assets/dashboard-icons/arrow-down.svg";
import { Link } from "react-router-dom";
import Layout from "../../../component/Layout";

import Button from "../../../component/shared/Button";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";

import { useForm } from "react-hook-form";
import FormError from "../../../component/shared/FormError";

import { useMutation, useQuery } from "@apollo/client";
import { BALANCE } from "../../../hooks";
import { REDEEM_FIAT_MUTATION } from "../../../hooks";
import { GET_BANK_DETAILS } from "../../../hooks";

const Withdraw = () => {
  const [focus, setFocus] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // phone: "",
    },
  });

  // Get balance Query
  const { data } = useQuery(BALANCE);
  // Get bank details Query
  const { data: bankDetails } = useQuery(GET_BANK_DETAILS);
  console.log("Bank Details:", bankDetails)
  // setWalletBalance(data?.balance?.data?.data);
  let balance = data?.balance?.data?.data;
  console.log("wallet balance", data?.balance?.data?.data);
  // setWalletBalance(data?.balance?.data?.data)

  // Mutation for Redeemign Token to Fiat
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
    redeemFiat({
      variables: {
        amount: data.amount,
        accountToWithdraw: data.accountToWithdraw,
      },
    })
      .then((res) => {
        toastSuccess(`${res.message}`);
      })
      .catch((error) => {
        toastError(`${error.message}`);
      });
  };

  return (
    <>
      <Layout>
        <div className="withdraw xl:h-screen h-auto">
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
                      onFocus={() => setFocus(true)}
                    />
                    <span className="max inline-flex items-center px-3 ">
                      MAX
                    </span>
                  </label>

                  <p className="withdraw-form_amount-form_balance">
                    Balance: ≈ 119,900.65 NGN
                  </p>
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
                        <a
                          href="/"
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
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
