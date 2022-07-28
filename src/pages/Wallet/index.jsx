import React, { useState, useEffect, useRef, useMemo } from "react";
import { ReactComponent as EyeOpen } from "../../assets/dashboard-icons/eye-icon.svg";
import { ReactComponent as EyeClose } from "../../assets/icons/eye-close.svg";
import { ReactComponent as AddIcon } from "../../assets/dashboard-icons/add-circle.svg";
import { ReactComponent as MinusIcon } from "../../assets/dashboard-icons/minus-cirlce.svg";
import { ReactComponent as ArrowUp } from "../../assets/dashboard-icons/arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../assets/dashboard-icons/arrow_down.svg";
import { ReactComponent as WithdrawIcon } from "../../assets/dashboard-icons/withdrawIcon.svg";
import { ReactComponent as ReceiveIcon } from "../../assets/dashboard-icons/receiveIcon.svg";
import { ReactComponent as FundIcon } from "../../assets/dashboard-icons/fundIcon.svg";
import { ReactComponent as SendIcon } from "../../assets/dashboard-icons/sendIcon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  toastError,
  toastSuccess,
  toastLoading,
} from "../../component/shared/Toasts";
import Layout from "../../component/Layout";
import { useVerifEmailStatus } from "../../utils/EmailVerifStatus";

import { useMutation, useQuery } from "@apollo/client";
import {
  MINT_TOKEN_MUTATION,
  GET_TRANSACTION_HISTORY,
  BALANCE,
} from "../../hooks";

// Transaction type object with the different transaction types
const transactTypes = {
  withdrawal: "Wthdrawal",
  deposit: "Deposit",
  booking: "Booking",
  refund: "Refund",
  send: "Send",
  receive: "Recieve",
};

const Wallet = () => {
  const navigate = useNavigate()
    const isVerified = useVerifEmailStatus();
  // This Function adds commas to amount figures
  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const dateRef = useRef({
    date: "",
  });

  //Query User Transaction history
  const {
    data: transactions,
    error: errorGettingTransacs,
    loading: loadingTrasacs,
  } = useQuery(GET_TRANSACTION_HISTORY);
  console.log("user Transactions", transactions?.transactions);

  // Get six transactions from Transactions query
  const transactionPlusOffset = useMemo(() => {
    return transactions?.transactions?.slice(0, 4);
  }, [transactions]);

  console.log("transactionPlusOffset: ", transactionPlusOffset);

  const [controlShowBalance] = useState("show");
  // Show wallet balance if false, else Hide wallet balance
  const [showBalance, setShowBalance] = useState(true);
  const { data } = useQuery(BALANCE);
  console.log("balanceData data: ", data?.balance?.data?.data);

  // Mint token Mutation
  const [
    mintFunction,
    { data: mintData, loading: mintLoading, error: mintError },
  ] = useMutation(MINT_TOKEN_MUTATION, {
    refetchQueries: [
      { query: BALANCE }, // DocumentNode object parsed with gql
      "balance", // Query name
    ],
  });

  if (data) {
    console.log("balanceData", data);
  }

  // Get the Searched parameter from URl.
  // The mint function is called immediately there is a searched parameter
  // The Searched paremeter is the transactionsac reference sent back from paypal in the URl
  const { search } = useLocation();
  console.log("search param", search);

  useEffect(() => {
    // Mint Token when Txn ref is found in Search param
    if (search) {
      mintFunction()
        .then((res) => {
          const success = res?.data?.status;
          success === "success" && toastSuccess(res?.data?.message);
          // window.location.pathname = "/wallet";
          window.location.replace("/wallet");
        })
        .catch((error) => {
          error && toastError("Something went wrong while minting tokens");
        });
    }
    console.log("search Query", search);
  }, [search, mintFunction]);

  console.log("Minting Tokens", mintData);


  const [showMobileButton, setShowMobileButton] = useState(
    window.matchMedia("(max-width:500px)").matches
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setShowMobileButton(window.matchMedia("(max-width:500px)").matches);
    });
  });

  useEffect(() => {
    if (controlShowBalance) {
      setShowBalance(true);
    }
  }, [controlShowBalance]);

  // Converts Milliseconds time to human readable date
  const createdAtDate = (x) => {
    let date = new Date(x);
    return date.toLocaleDateString("sv");
  };
  // Converts Milliseconds time to human readable time
  const createdAtTime = (x) => {
    let date = new Date(x);
    return date.toLocaleTimeString("en-US");
  };

  return (
    <Layout>
      <div className="wallet-container !min-h-[100vh] w-screen">
        <div className="sticky z-[3] top-[4.5rem]">
          {/* Wallet Balance Banner */}
          <div className="wallet">
            <div className="wallet-type">
              <p> Aeropaye Balance </p>
              <button
                onClick={() => {
                  setShowBalance(!showBalance);
                }}
              >
                {showBalance ? <EyeOpen /> : <EyeClose />}
              </button>
            </div>
            <p className="wallet-bal">
              {showBalance
                ? data?.balance?.data?.data
                  ? `${numberWithCommas(data?.balance?.data?.data)}`
                  : "0"
                : "****"}
            </p>
            <p className="wallet-rate">
              {showBalance
                ? data?.balance?.data?.data
                  ? `≈ ${numberWithCommas(data?.balance?.data?.data)} NGN`
                  : "≈ 0.00 NGN"
                : "****"}
            </p>
          </div>
          {/* Wallet Balance banner End */}

          {showMobileButton ? (
            <div className="wallet-mobile-buttons">
              <div
                onClick={() => {
                  isVerified
                    ? navigate("/wallet/deposit")
                    : toastError("Verify Email address to make deposits");
                }}
                className="mobile_deposit mobile_button cursor-pointer"
              >
                Deposit
              </div>

              <div className="flex items-center w-full justify-evenly">
                <Link to="withdraw" className="mobile_button mr-[16px]">
                  Withdraw
                </Link>
                <Link to="send" className="mobile_button mr-[16px]">
                  Send
                </Link>
                <Link to="receive" className="mobile_button">
                  Receive
                </Link>
              </div>
            </div>
          ) : (
            <div className="wallet-buttons">
              <div
                onClick={() => {
                  isVerified
                    ? navigate("/wallet/deposit")
                    : toastError(
                        "Verify your Email address to make deposit"
                      );
                }}
                className="deposit button cursor-pointer"
              >
                <AddIcon />
                <span>Deposit</span>
              </div>
              <Link to="withdraw" className="button">
                <MinusIcon />
                <span>Withdraw</span>
              </Link>
              <Link to="send" className="button">
                <ArrowUp />
                <span>Send</span>
              </Link>
              <Link to="receive" className="button">
                <ArrowDown />
                <span>Receive</span>
              </Link>
            </div>
          )}
        </div>

        {showMobileButton ? (
          <p className="mobile-wallet-title">Recent wallet transactions</p>
        ) : (
          ""
        )}
        <section className="wallet-transaction">
          <div className="flex items-center justify-between">
            {showMobileButton ? (
              ""
            ) : (
              <p className="title">Recent wallet transactions</p>
            )}
            <Link
              to="/transaction-history"
              className={`${
                (errorGettingTransacs ||
                  loadingTrasacs ||
                  transactions?.transactions.length === 0) &&
                "!text-gray"
              } trans-history`}
            >
              See all transactions
            </Link>
          </div>
          {/* RECENT HISTORY */}
          <div className="recent-history">
            {transactions?.transactions.length === 0 && (
              <div className="recent-history_list text-center py-[32px] font-medium text-black">
                No Record Found
              </div>
            )}
            {transactionPlusOffset?.map((transaction, index) => (
              <div ref={dateRef} key={index}>
                {/* Transaction History */}
                <div className="flex justify-between items-center recent-history_list">
                  <div className="flex items-center">
                    {transaction?.trxType === transactTypes.deposit && (
                      <FundIcon />
                    )}
                    {transaction?.trxType === transactTypes.withdrawal && (
                      <WithdrawIcon />
                    )}
                    {transaction?.trxType === transactTypes.booking && (
                      <WithdrawIcon />
                    )}
                    {transaction?.trxType === transactTypes.receive && (
                      <ReceiveIcon />
                    )}
                    {transaction?.trxType === transactTypes.refund && (
                      <ReceiveIcon />
                    )}
                    {transaction?.trxType === transactTypes.send && (
                      <SendIcon />
                    )}
                    <div className="details flex flex-col items-start">
                      <p className="trans-description">
                        {transaction?.description}
                        {/* Withdrawal to bank account */}
                      </p>
                      <p className="trans-date">
                        {`${createdAtDate(
                          parseInt(transaction.createdAt)
                        )}, ${createdAtTime(parseInt(transaction.createdAt))}`}
                      </p>
                    </div>
                  </div>
                  <div className="details flex flex-col items-end">
                    <p className="trans-balance">
                      {`${
                        transaction?.trxType === transactTypes.withdrawal ||
                        transaction?.trxType === transactTypes.send ||
                        transaction?.trxType === transactTypes.booking
                          ? "-"
                          : "+"
                      } ${numberWithCommas(transaction?.amount)} NGN`}
                    </p>
                    <p className="trans-rate">
                      {`≈ ${numberWithCommas(transaction?.amount)} ARP`}
                    </p>
                  </div>
                </div>
                {/* Transaction History End */}
              </div>
            ))}
          </div>
          {/* RECENT HISTORY END */}
        </section>
      </div>
    </Layout>
  );
};

export default Wallet;
