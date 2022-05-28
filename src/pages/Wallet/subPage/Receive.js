import React, { useState, useRef } from "react";
import { ReactComponent as Warning } from "../../../assets/dashboard-icons/Icon_Warning.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import { ReactComponent as Copy } from "../../../assets/dashboard-icons/copy.svg";
import { Link } from "react-router-dom";
import Layout from "../../../component/Layout";

const Receive = () => {
  const [isCopy, setIsCopy] = useState(false);
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
  }

  return (
    <>
      <Layout>
        <div className="withdraw xl:h-screen h-auto">
          <div className="withdraw-container">
            <Link to="/wallet" className="back-link">
              <ArrowLeft />
              <p className="back-link_nav">Back</p>
            </Link>

            <div className="withdraw-form">
              <div className="withdraw-form_warning">
                <Warning />
                <p className="ml-[10px]">
                  Send only <b>Aeropaye (TICKER)</b> to this address. Sending
                  any other coins may result to permanent loss
                </p>
              </div>

              <div className="withdraw-form_amount-form">
                <p className="withdraw-form_amount-form_title">
                  Aeropaye Address
                </p>

                <label className="flex withdraw-form_amount-form_input-copy">
                  <input
                    type="text"
                    value="0x078395eec8b3b15888b70cf64db2fadc12b6d860"
                    ref={textAreaRef}
                    readOnly
                  />
                  <button
                    className="copy inline-flex items-center px-3"
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
