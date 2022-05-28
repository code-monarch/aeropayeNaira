import React, { useState } from "react";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import { ReactComponent as ArrowDown } from "../../../assets/dashboard-icons/arrow-down.svg";
import { Link } from "react-router-dom";
import Layout from "../../../component/Layout";

const Withdraw = () => {
  const [focus, setFocus] = useState(false);
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
                <button
                  className="withdraw-form_button flex items-center cursor-pointer justify-center"
                  type="submit"
                >
                  Confirm Withdrawal
                </button>
              </div>

              <p className="withdraw-form_info">
                Should arrive within 1-2 business days
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Withdraw;
