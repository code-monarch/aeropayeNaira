import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import Button from "../../../component/shared/Button";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";
import { Link } from "react-router-dom";
import Layout from "../../../component/Layout";

import { useForm } from "react-hook-form";
import FormError from "../../../component/shared/FormError";

import { useMutation, useQuery } from "@apollo/client";
import { TRANSFER_TOKEN, BALANCE } from "../../../hooks";
import { useNavigate } from "react-router-dom";

const Send = () => {
  const navigate = useNavigate();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const [walletBalance, setWalletBalance] = useState("");

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Get balance Query
  const { data } = useQuery(BALANCE);

  let balance = data?.balance?.data?.data;
  console.log("wallet balance", data?.balance?.data?.data);

  // Mutation for Transferring Token
  const [
    transferToken,
    { loading: sendingToken },
  ] = useMutation(TRANSFER_TOKEN, {
    refetchQueries: [
      { query: BALANCE }, // DocumentNode object parsed with gql
      "balance", // Query name
    ],
  });
  
  useEffect(() => {
    balance && setWalletBalance(balance);

    return () => {
      setWalletBalance();
    };
  }, [balance]);

  // Handle form submit
  const submit = (data) => {
    transferToken({
      variables: {
        recipientAddress: data.address,
        amount: data.amount,
      },
    })
      .then((res) => {
        console.log("resss: ", res)
        toastSuccess(`${res?.data?.transferToken?.message}`);
        navigate(-1);
      })
      .catch((error) => {
        toastError(`${error.message}`);
      });
  };

  const [focus, setFocus] = useState("");
  return (
    <>
      <Layout>
        <div className="withdraw xl:h-screen h-auto w-screen 2xl:w-[1536px]">
          <div className="withdraw-container">
            <Link to="/wallet" className="back-link">
              <ArrowLeft />
              <p className="back-link_nav">Back</p>
            </Link>

            <form onSubmit={handleSubmit(submit)} className="withdraw-form">
              <div>
                <p className="withdraw-form_title">Who are you sending to?</p>

                <div className="withdraw-form_amount-form">
                  {/* <p className="withdraw-form_amount-form_title">
                    Recipient Address
                  </p> */}

                  <label
                    className={`flex withdraw-form_amount-form_input ${
                      focus === "address" ? "clicked" : ""
                    }`}
                  >
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="input-email !rounded-l-[6px] !rounded-r-[6px] !pl-[20px]"
                      {...register("address", {
                        required: "Please enter wallet address",
                      })}
                      placeholder="Enter Recipient wallet address"
                      onFocus={() => setFocus("address")}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard
                          .readText()
                          .then((text) => {
                            setValue("address", `${text}`, {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                          })
                          .catch((err) => {
                            toastError("Failed to read clipboard contents");
                          });
                      }}
                      className="max inline-flex items-center px-3 cursor-pointer"
                    >
                      PASTE
                    </button>
                  </label>
                  <div className="w-[100%] flex justify-end">
                    <FormError errors={errors} name="address" />
                  </div>
                </div>
              </div>

              {/* AMOUNT */}
              <div className="mt-[16px] mb-[32px]">
                <p className="withdraw-form_title">How much are you sending?</p>

                <div className="withdraw-form_amount-form">
                  {/* <p className="withdraw-form_amount-form_title">Amount</p> */}

                  {/* AMOUNT INPUT */}
                  <label
                    className={`flex withdraw-form_amount-form_input ${
                      focus === "amount" ? "clicked" : ""
                    }`}
                  >
                    <input
                      type="text"
                      // value={amount}
                      name="amount"
                      id="amount"
                      // onChange={(e) => {
                      //   setAmount(e.target.value);
                      // }}
                      {...register("amount", {
                        required: "Please enter amount",
                      })}
                      className="input-email !rounded-l-[6px] !rounded-r-[6px] !pl-[20px]"
                      placeholder="Enter amount"
                      onFocus={() => setFocus("amount")}
                    />
                  </label>
                  {/* AMOUNT INPUT END */}
                  {/* BALANCE AND ERROR */}
                  <div className="w-[100%] flex justify-between">
                    <p className="withdraw-form_amount-form_balance">
                      Balance:{" "}
                      {walletBalance && numberWithCommas(walletBalance)}{" "}
                      {!walletBalance && "0"} {""} ARP
                    </p>
                    <FormError errors={errors} name="amount" />
                  </div>
                  {/* BALANCE AND ERROR END */}
                </div>
              </div>

              <div>
                <Button
                  className="withdraw-form_button flex items-center cursor-pointer justify-center cursor-ppointer"
                  type="submit"
                  loading={sendingToken}
                >
                  Send aeropaye
                </Button>
              </div>

              <p className="withdraw-form_info">
                Should arrive after 5 network confirmations
              </p>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Send;
