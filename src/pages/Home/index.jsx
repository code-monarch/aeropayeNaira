import { useContext, useCallback, useState } from "react";
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
import { USER_VERIFICATION_STATUS } from "../../hooks";
import { GET_BANK_DETAILS } from "../../hooks";
import { BALANCE } from "../../hooks";
import { FLIGHT_HISTORY } from "../../hooks";
import { verifyContext } from "../../hooks/verifyContext";

const Home = () => {
  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const { verify } = useContext(verifyContext);

  const [closeGetStarted, setCloseGetStarted] = useState(false);

  // User verification status
  const { data } = useQuery(USER_VERIFICATION_STATUS);

  // Get Bank Details
  const { data: bankDetailsData } = useQuery(GET_BANK_DETAILS);

  // Get Wallet Balance
  const { data: balanceData } = useQuery(BALANCE);
  console.log("User verification status", data?.userVerificationStatus);
  console.log("Bank Details", bankDetailsData?.userBankDetails);
  console.log("Wallet balance", balanceData?.balance?.data?.data);

    const { data: flightHistory } = useQuery(FLIGHT_HISTORY);
    console.log("flight History", flightHistory?.bookedFlightHistory);

  // Store VerificationStatus in variable
  const verificationStatus = data?.userVerificationStatus;

  // Memoize Email verification status to prevent continues rerendering
  useCallback(() => {
    verify.updateVerify(verificationStatus);
  }, [verificationStatus, verify]);
  console.log("Email verification status state:", verify);

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

        <section className="home-container mx-[34px] w-[1312px]">
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
                  <Link to="/confirmation" className="step">
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
                  <Link to="/settings" className="step">
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
                {balanceData === 0 ||
                  (balanceData === undefined && (
                    <Link to="/wallet/deposit" className="step">
                      <span className="step-stat uppercase">Step 4</span>
                      <span className="step-info">
                        Fund your wallet
                      </span>
                      <ArrowRight />
                    </Link>
                  ))}

                {balanceData !== 0 && balanceData !== undefined && (
                  <div className="step">
                    <span className="step-stat-done">DONE</span>
                    <span className="complete">Fund your aeropaye wallet</span>
                  </div>
                )}
                {/* Step 4 End */}

                {/* Step 5 */}
                <Link to="/settings" className="step">
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
              <label className="checkbox flex items-center">
                <input type="checkbox" />
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
                  {balanceData?.balance?.data?.data ? numberWithCommas(balanceData?.balance?.data?.data) : "0 NGN"}
                </p>
                <p className="rates">
                  {`≈ ${balanceData?.balance?.data?.data ? numberWithCommas(balanceData?.balance?.data?.data) : "0"} NGN`}
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
                      {flightHistory?.bookedFlightHistory?.length ?flightHistory?.bookedFlightHistory?.length : "0"}
                    </h2>
                    <p className="aero-token">(0.00 Aeropaye)</p>
                  </div>
                </div>

                <div className="flight-booked my-[20px]">
                  <p>Refunds Claimed</p>
                  <div className="flex items-center book">
                    <p className="booked">0</p>
                    <p className="aero-token">(0.00 NGN)</p>
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
                    <p className="booked">0</p>
                    <p className="aero-token">(≈ 0.00 NGN)</p>
                  </div>
                </div>

                <div className="flight-booked my-[20px]">
                  <p>Total Withdrawals</p>
                  <div className="book">
                    <p className="booked">0.00 NGN </p>
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
