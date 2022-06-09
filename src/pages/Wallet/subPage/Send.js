import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import Button from "../../../component/shared/Button";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";
import { Link } from "react-router-dom";
import Layout from "../../../component/Layout";

import { useForm } from "react-hook-form";
import FormError from "../../../component/shared/FormError";

import { useMutation, useQuery } from "@apollo/client";
import { BALANCE } from "../../../hooks";
import { TRANSFER_TOKEN } from "../../../hooks";

const Send = () => {
    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  
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
  // setWalletBalance(data?.balance?.data?.data);
  let balance = data?.balance?.data?.data;
  console.log("wallet balance", data?.balance?.data?.data);
  // setWalletBalance(data?.balance?.data?.data)



  // Mutation for Transferring Token
  const [
    transferToken,
    { data: transferTokenData, loading: sendingToken, error: TransferError },
  ] = useMutation(TRANSFER_TOKEN, {
    refetchQueries: [
      { query: BALANCE }, // DocumentNode object parsed with gql
      "balance", // Query name
    ],
  });

  useEffect(() => {
    balance && setWalletBalance(balance)
  
    return () => {
      setWalletBalance()
    }
  }, [balance])
  


  // Handle form submit
  const submit = (data) => {
        transferToken({
          variables: {
            recipientAddress: data.address,
            amount: data.amount,
          },
        }).then((res) => {
          toastSuccess(`${res.message}`)
        }).catch((error) => {
          toastError(`${error.message}`)
        })
  }

  const [focus, setFocus] = useState("");
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
                <p className="withdraw-form_title">Who are you sending to?</p>

                <div className="withdraw-form_amount-form">
                  <p className="withdraw-form_amount-form_title">
                    Recipient Address
                  </p>

                  <label
                    className={`flex withdraw-form_amount-form_input ${
                      focus === "address" ? "clicked" : ""
                    }`}
                  >
                    <input
                      type="text"
                      id="address"
                      name="address"
                      // value={address}
                      // onChange={(e) => {
                      //   setAddress(e.target.value);
                      // }}
                      className="input-email"
                      {...register("address", {
                        required: "Please enter wallet address",
                      })}
                      placeholder="Enter wallet or email address"
                      onFocus={() => setFocus("email")}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard
                          .readText()
                          .then((text) => {
                            setAddress(text);
                          })
                          .catch((err) => {
                            toastError("Failed to read clipboard contents");
                          });
                      }}
                      className="max inline-flex items-center px-3"
                    >
                      PASTE
                    </button>
                  </label>
                  <FormError errors={errors} name="address" />
                </div>
              </div>

              <div className="mt-[36px] mb-[32px]">
                <p className="withdraw-form_title">How much are you sending?</p>

                <div className="withdraw-form_amount-form">
                  <p className="withdraw-form_amount-form_title">Amount</p>

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
                      className="input-email"
                      placeholder="Enter amount"
                      onFocus={() => setFocus("amount")}
                    />
                  </label>
                  <FormError errors={errors} name="amount" />

                  <p className="withdraw-form_amount-form_balance">
                    Balance: {walletBalance && numberWithCommas(walletBalance)}{" "}
                    {!walletBalance && "0"} {""} ARP
                  </p>
                </div>
              </div>

              <div>
                <Button
                  className="withdraw-form_button flex items-center cursor-pointer justify-center"
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
