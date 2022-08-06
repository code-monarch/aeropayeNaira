import React,{ useContext, useState } from "react";
import { authContext } from "../../hooks/auth";
import { ReactComponent as Wave } from "../../assets/dashboard-icons/wave.svg";
import { ReactComponent as Onboarding } from "../../assets/dashboard-icons/onboarding_illus.svg";
import { ReactComponent as ArrowRight } from "../../assets/dashboard-icons/arrow-right.svg";
import { ReactComponent as Close } from "../../assets/dashboard-icons/icon_close.svg";
import { ReactComponent as AeropayeBalance } from "../../assets/dashboard-icons/aeropaye-balance.svg";
import { ReactComponent as BookedFlight } from "../../assets/dashboard-icons/booked-flight.svg";
import { ReactComponent as TotalDeposit } from "../../assets/dashboard-icons/total-deposit.svg";
import { ReactComponent as EyeOpen } from "../../assets/dashboard-icons/eye-icon.svg";
import { ReactComponent as ArrowUp } from "../../assets/dashboard-icons/arrow-up.svg";
import { Link } from "react-router-dom";
import Layout from "../../component/Layout";

import { useQuery } from "@apollo/client";
import {
  USER_VERIFICATION_STATUS,
  GET_BANK_DETAILS,
  USER_PROFILE,
} from "../../hooks";

const Home = () => {
  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [closeGetStarted, setCloseGetStarted] = useState(false);

  // User verification status
  const { data } = useQuery(USER_VERIFICATION_STATUS);

  // Get Bank Details
  const { data: bankDetailsData } = useQuery(GET_BANK_DETAILS);

  const { data: userProfile } = useQuery(USER_PROFILE);
  console.log("UserProfile", userProfile);
  console.log("UserProfile", userProfile?.getAUser?.walletBalance);

  // Store VerificationStatus in variable
  const verificationStatus = data?.userVerificationStatus;
  console.log("Email verification status state:", verificationStatus);

  let bankdetailsLength = Boolean(
    Array.isArray(bankDetailsData?.userBankDetails) &&
      bankDetailsData?.userBankDetails.length
  );

  // Get User's name from user authentication object
  const {
    auth: {
      user: { firstname },
    },
  } = useContext(authContext);
  return (
    <Layout>
      <div className="home bg-bg min-h-[100vh] w-screen mt-[-72px] pt-[72px]">
        {/* Welcome Banner */}
        <div className="welcome-div sticky z-[3] top-[4.5rem] w-full 2xl:flex 2xl:flex-col items-center">
          <div className="welcome-div_message 2xl:!w-[1312px]">
            <p className="title 2xl:text-[32px]">
              Welcome,
              {/* <span className="username">&nbsp;Derek</span> */}
              <span className="username capitalize">&nbsp;{firstname}</span>
              <span className="message-icon">
                <Wave />
              </span>
            </p>
            <p className="text 2xl:!max-w-[700px]">
              Process your refund claims within seconds of delayed or cancelled
              flight, seemlessly book and pay for flights for your travels and
              events.
            </p>
          </div>
        </div>
        {/* Welcome Banner End */}

        <section className="home-container mx-[34px] max-w-[1312px]">
          <div
            className={
              closeGetStarted
                ? "hidden"
                : "get-started flex items-start justify-between lg:flex-row flex-col-reverse"
            }
          >
            {/* Getting Started */}
            <div className="getting_started transition ease-in-out">
              <div className="get-started_container">
                <div className="infoo">
                  <p className="infoo_title">Getting Started</p>
                  <p className="infoo_subtitle">
                    Let's help you get started. Here are some key things to do.
                  </p>
                </div>

                <Onboarding className="mt-[16px]" />
              </div>

              {/* step 1 */}
              <div className="get-started_steps">
                <div className="step">
                  <span className="step-stat-done">DONE</span>
                  <span className="complete">Complete registration</span>
                </div>
                {/* Step 1 End */}

                {/* step 2 */}
                {(verificationStatus === false ||
                  verificationStatus === undefined) && (
                  <Link to="/verify-email" className="step">
                    <>
                      <span className="step-stat uppercase">Step 2</span>
                      <span className="step-info">Verify email address</span>
                    </>
                    {verificationStatus === false ||
                    verificationStatus === undefined ? (
                      <ArrowRight />
                    ) : (
                      ""
                    )}
                  </Link>
                )}
                {verificationStatus === true && (
                  <div className="step">
                    <span className="step-stat-done">DONE</span>
                    <span className="complete">Verify email address</span>
                  </div>
                )}
                {/* Step 2 End */}

                {/* Step 3 */}
                {(bankdetailsLength === false ||
                  bankDetailsData === undefined) && (
                  <Link to="/settings#bank-account" className="step">
                    <span className="step-stat uppercase">Step 3</span>
                    <span className="step-info">Add a bank account</span>
                    {bankdetailsLength === false ? <ArrowRight /> : ""}
                  </Link>
                )}
                {bankdetailsLength === true && (
                  <div className="step">
                    <>
                      <span className="step-stat-done">DONE</span>
                      <span className="complete">Add a bank account</span>
                    </>
                  </div>
                )}
                {/* Step 3 End */}

                {/* Step 4 */}
                {userProfile?.getAUser?.walletBalance === 0 ||
                  userProfile?.getAUser?.walletBalance === undefined ||
                  (userProfile?.getAUser?.walletBalance === null && (
                    <Link to="/wallet" className="step">
                      <span className="step-stat uppercase">Step 4</span>
                      <span className="step-info">Fund your wallet</span>
                      <ArrowRight />
                    </Link>
                  ))}

                {userProfile?.getAUser?.walletBalance !== 0 &&
                  userProfile?.getAUser?.walletBalance !== undefined &&
                  userProfile?.getAUser?.walletBalance !==
                    null && (
                      <div className="step">
                        <span className="step-stat-done">DONE</span>
                        <span className="complete">
                          Fund your aeropaye wallet
                        </span>
                      </div>
                    )}
                {/* Step 4 End */}

                {/* Step 5 */}
                <Link to="/settings#profile" className="step">
                  <span className="step-stat uppercase">Step 5</span>
                  <span className="step-info">
                    Complete your booking profile
                  </span>
                  <ArrowRight />
                </Link>
                {/* Step 5 End */}
              </div>
            </div>
            {/* Getting Started End */}

            <div className="w-full lg:w-auto flex items-center justify-between pr-2">
              <label className="flex items-center">
                <input type="checkbox" className="cursor-pointer shadow-sm"/>
                <span className="checkbox-info">Don't show me this again</span>
              </label>
              <div
                onClick={() => {
                  setCloseGetStarted(true);
                  console.log("clickedddddd");
                }}
                className="cursor-pointer"
              >
                <Close />
              </div>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col justify-evenly items-center mt-[32px] user-details">
            {/* First */}
            <Link
              to="/wallet"
              className="user-details_container mr-[24px] w-[421px]"
            >
              <div className="flex items-center justify-between">
                <div className="type">
                  <p> Wallet Balance </p>
                  <button>
                    <EyeOpen />
                  </button>
                </div>

                <div>
                  <AeropayeBalance />
                </div>
              </div>

              <div className="balance-container">
                <p className="balance">
                  {userProfile?.getAUser?.walletBalance
                    ? numberWithCommas(userProfile?.getAUser?.walletBalance)
                    : "0.00 NGN"}
                </p>
                <p className="rates">
                  {`≈ ${
                    userProfile?.getAUser?.walletBalance
                      ? numberWithCommas(userProfile?.getAUser?.walletBalance)
                      : "0.00"
                  } NGN`}
                </p>
              </div>

              <div className="flex items-center">
                <p className="percentage-increase">+0.00%</p>
                <ArrowUp />
              </div>
            </Link>

            <Link
              to="/flights"
              className="user-details_container mr-[24px] flex justify-between items-start"
            >
              <div className="mt-[-7px]">
                <div className="flight-booked my-[20px]">
                  <p>Flight Booked</p>
                  <div className="flex items-center lg:items-start xl:items-center book xl:flex-row lg:flex-col flex-row">
                    <h2 className="booked">
                      {userProfile?.getAUser?.numOfFlights
                        ? userProfile?.getAUser?.numOfFlights
                        : "0"}
                    </h2>
                    <p className="aero-token">
                      (
                      {userProfile?.getAUser?.totalFee
                        ? numberWithCommas(userProfile?.getAUser?.totalFee) +
                          " NGN"
                        : "≈ 0.00 NGN"}
                      )
                    </p>
                  </div>
                </div>

                <div className="flight-booked my-[20px]">
                  <p>Refunds Claimed</p>
                  <div className="flex items-center book">
                    <p className="booked">
                      {userProfile?.getAUser?.numOfRefunds
                        ? userProfile?.getAUser?.numOfRefunds
                        : "0"}
                    </p>
                    <p className="aero-token">
                      (
                      {userProfile?.getAUser?.totalRefunds
                        ? numberWithCommas(
                            userProfile?.getAUser?.totalRefunds
                          ) + " NGN"
                        : "≈ 0.00 NGN"}
                      )
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <BookedFlight />
              </div>
            </Link>

            <Link
              to="/transaction-history"
              className="user-details_container flex justify-between text-left"
            >
              <div className="mt-[-7px]">
                <div className="flight-booked my-[20px]">
                  <p>Total Deposits</p>
                  <div className="flex items-start sm:items-center lg:items-start xl:items-center book xl:flex-row lg:flex-col sm:flex-row flex-col">
                    <p className="booked">
                      {" "}
                      {userProfile?.getAUser?.totalRefunds
                        ? numberWithCommas(userProfile?.getAUser?.totalDeposits)
                        : "0.00"}
                    </p>
                    <p className="aero-token">
                      {`≈ ${
                        userProfile?.getAUser?.totalRefunds
                          ? numberWithCommas(
                              userProfile?.getAUser?.totalDeposits
                            ) + " NGN"
                          : " 0.00 NGN"
                      }`}
                    </p>
                  </div>
                </div>

                <div className="flight-booked my-[20px]">
                  <p>Total Withdrawals</p>
                  <div className="book">
                    <p className="booked">
                      (
                      {userProfile?.getAUser?.totalRefunds
                        ? numberWithCommas(
                            userProfile?.getAUser?.totalWithdraws
                          ) + " NGN"
                        : "≈ 0.00 NGN"}
                      )
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <TotalDeposit />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
