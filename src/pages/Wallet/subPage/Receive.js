import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as Warning } from "../../../assets/dashboard-icons/Icon_Warning.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import { ReactComponent as Copy } from "../../../assets/dashboard-icons/copy.svg";
import Error from "../../../assets/Error.png";
import { Link } from "react-router-dom";
import Layout from "../../../component/Layout";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DEPOSIT_QRCODE, USER_PROFILE } from "../../../hooks";

const Receive = () => {
  const [isCopy, setIsCopy] = useState(false);
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
  }

  // This Mutation gets the user deposit QR code
  const [getDepositQRCode, { loading }] = useMutation(GET_DEPOSIT_QRCODE);
  const {
    data: userProfile,
    loading: loadingUserDetails,
    error: errorGettingUserData,
  } = useQuery(USER_PROFILE);
  console.log("USER PROFILE", userProfile);

  const [qrimg, setQrImg] = useState("");

  useEffect(() => {
    getDepositQRCode()
      .then((res) => {
        console.log("QR CODE: ", res?.data?.getDepositQRCode?.data);
        setQrImg(() => res?.data?.getDepositQRCode?.data);
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  }, [getDepositQRCode]);

  return (
    <>
      <Layout>
        <div className="withdraw xl:h-screen h-auto w-screen">
          <div className="withdraw-container">
            <Link to="/wallet" className="back-link">
              <ArrowLeft />
              <p className="back-link_nav">Back</p>
            </Link>

            <div className="withdraw-form">
              {/* QR code */}
              <div className="w-full flex justify-center">
                <div className="flex justify-center items-center w-[200px] h-[200px] p-[5px] border-[1px] border-[#DDEFFF] rounded-[8px]">
                  <div className={`${loading && "skeleton-box"}`}>
                    {loading ? (
                      ""
                    ) : (
                      <img
                        src={`${userProfile?.getAUser?.addr ? qrimg : Error}`}
                        className={`${
                          !userProfile?.getAUser?.addr && "w-[40px] h-[40px]"
                        }`}
                        alt="QR code"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="withdraw-form_warning">
                <Warning />
                <p className="ml-[10px]">
                  Send only <b>Aeropaye (ARP)</b> to this address. Sending any
                  other coins may result to permanent loss
                </p>
              </div>

              <div className="withdraw-form_amount-form">
                <p className="withdraw-form_amount-form_title">
                  Aeropaye Address
                </p>

                <label className="flex withdraw-form_amount-form_input-copy">
                  <input
                    className="rounded-[6px] !pl-[10px]"
                    type="text"
                    value={userProfile?.getAUser?.addr}
                    placeholder={`${
                      !loadingUserDetails && !errorGettingUserData && !userProfile?.getAUser?.addr
                        ? "Verify Email to create a wallet address"
                        : ""
                    }${
                      loadingUserDetails ? "Getting your wallet address..." : ""
                    }${
                       errorGettingUserData ? "Could not get your wallet address" : ""
                     }`}
                    ref={textAreaRef}
                    readOnly
                  />
                  <button
                    className="copy inline-flex items-center px-3 rounded-r-[6px]"
                    onClick={() => {
                      setIsCopy(true);
                      copyToClipboard();
                    }}
                  >
                    {isCopy ? "Copied" : <Copy />}
                  </button>
                </label>
              </div>

              <p className="withdraw-form_info">
                Should arrive after 5 network confirmations
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Receive;
