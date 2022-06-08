import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { ReactComponent as ArrowDown } from "../../../assets/dashboard-icons/arrow-down.svg";
import { ReactComponent as Trash } from "../../../assets/dashboard-icons/trash.svg";
import Button from "../../../component/shared/Button";

import { Controller, useForm } from "react-hook-form";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";

import { useMutation, useQuery } from "@apollo/client";
import { BANK_DETAILS_MUTATION } from "../../../hooks";
import { GET_BANK_DETAILS } from "../../../hooks";

// import FormError from "../../../component/shared/FormError";

const Account = () => {
  //   const [openDropdown, setOpenDropdown] = useState(false)
  const [selected, setSelected] = useState("NG");
  const [selectCountry, setSelectCountry] = useState();
  const [accName, setAccName] = useState();
  const [selectedBank, setSelectedBank] = useState();
  const [selectAccType, setSelectAccType] = useState();
  const [swiftCode, setSwiftCode] = useState();
  const [iban, setIban] = useState();

  //Bank Details Mutation
  const [userBankDetails, { data, loading, error }] = useMutation(
    BANK_DETAILS_MUTATION
  );
  //Bank Details Query
  const {
    data: bankDetails,
    loading: loadingBankDetails,
    error: bankDetailsError,
  } = useQuery(GET_BANK_DETAILS);

  const banks = [
    "9Payment Service Bank",
    "Abbey Mortgage Bank",
    "Above Only MFB",
    "Access Bank",
    "Access Bank (Diamond)",
    "Airtel Smartcash PSB",
    "ALAT by WEMA",
    "Amju Unique MFB",
    "ASO Savings and Loans",
    "Astrapolaris MFB LTD",
    "Bainescredit MFB",
    "Bowen Microfinance Bank",
    "Carbon",
    "CEMCS Microfinance Bank",
    "Chanelle Microfinance Bank Limited",
    "Citibank Nigeria",
    "Corestep MFB",
    "Coronation Merchant Bank",
    "Ecobank Nigeria",
    "Ekondo Microfinance Bank",
    "Eyowo",
    "Fidelity Bank",
    "Firmus MFB",
    "First Bank of Nigeria",
    "First City Monument Bank",
    "FSDH Merchant Bank Limited",
    "Gateway Mortgage Bank LTD",
    "Globus Bank",
    "GoMoney",
    "Guaranty Trust Bank",
    "Hackman Microfinance Bank",
    "Hasal Microfinance Bank",
    "Heritage Bank",
    "HopePSB",
    "Ibile Microfinance Bank",
    "Infinity MFB",
    "Jaiz Bank",
    "Kadpoly MFB",
    "Keystone Bank",
    "Kredi Money MFB LTD",
    "Kuda Bank",
    "Lagos Building Investment Company Plc.",
    "Links MFB",
    "Living Trust Mortgage Bank",
    "Lotus Bank",
    "Mayfair MFB",
    "Mint MFB",
    "MoMo PSB",
    "Paga",
    "PalmPay",
    "Parallex Bank",
    "Parkway - ReadyCash",
    "Paycom",
    "Petra Mircofinance Bank Plc",
    "Polaris Bank",
    "Providus Bank",
    "QuickFund MFB",
    "Rand Merchant Bank",
    "Refuge Mortgage Bank",
    "Rubies MFB",
    "Safe Haven MFB",
    "Sparkle Microfinance Bank",
    "Stanbic IBTC Bank",
    "Standard Chartered Bank",
    "Stellas MFB",
    "Sterling Bank",
    "Suntrust Bank",
    "TAJ Bank",
    "Tangerine Money",
    "TCF MFB",
    "Titan Bank",
    "Unical MFB",
    "Union Bank of Nigeria",
    "United Bank For Africa",
    "Unity Bank",
    "VFD Microfinance Bank Limited",
    "Wema Bank",
    "Zenith Bank",
  ];
  const accTypes = ["SAVINGS_ACCOUNT", "CURRENT_ACCOUNT"];
  const countries = ["NIGERIA", "GHANA", "USA", "BRAZIL"];
  return (
    <div className="account-container">
      <div className="account-container_form">
        <p className="title">Add new bank account</p>
        <p className="subtitle">
          Please make sure the name registered on the bank account matches the
          one registered on your Aeropaye account.
        </p>
        <div className="form-line"></div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            userBankDetails({
              variables: {
                residentCountry: selectCountry,
                acctName: accName,
                acctBank: selectedBank,
                acctNumber: iban,
                acctType: selectAccType,
                acctSwiftCode: "",
              },
            })
              .then((res) => {
                toastSuccess(res?.userBankDetails?.message);
                console.log("Bank details response:", res);
              })
              .catch((error) => {
                toastError(`${error?.message}`);
                console.log(error);
              });
          }}
          className="account-form"
        >
          <div className="acct-form">
            {/* BANK RESIDENT COUNTRY */}
            <div className="account-form_inputs input_1">
              <p className="account-form_inputs-title">
                Bank Account Resident Country
              </p>
              <div className="account-form_inputs-dropdown flex items-center justify-between">
                <button
                  id="dropdownButton6"
                  data-dropdown-toggle="dropdown6"
                  className={`${
                    selectCountry && "text-black"
                  } acct-dropdown w-full px-4 py-2.5 text-left inline-flex items-center justify-between`}
                  type="button"
                >
                  {selectCountry ? selectCountry : "— Select —"}
                  <ArrowDown />
                </button>
                <div
                  id="dropdown6"
                  className="hidden z-10 w-48 list-none bg-white rounded divide-y divide-gray-100 shadow-md"
                >
                  <ul className="py-1" aria-labelledby="dropdownButton">
                    {countries.map((country, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          className="block w-[100%] text-left py-2 px-4 text-sm text-[#212934] hover:bg-[#F0FFFC]"
                          onClick={() => {
                            setSelectCountry(country);
                          }}
                        >
                          {country}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* <div className="">
                <ReactFlagsSelect
                  selected={selected}
                  onSelect={(code) => setSelected(code)}
                  className="h-[48px] w-full country-input"
                  searchable
                />
              </div> */}
            </div>
            {/* RESIDENT COUNTRY */}

            {/* ACCOUNT NAME */}
            <div className="account-form_inputs">
              <label htmlFor="accName" className="account-form_inputs-title">
                Name on account
              </label>
              <div className="account-form_inputs-label flex items-center">
                <input
                  type="text"
                  id="accName"
                  name="accName"
                  value={accName}
                  onChange={(e) => {
                    setAccName(e.target.value);
                  }}
                  placeholder="John Doe"
                  className={`${
                    accName && "text-black"
                  } placeholder:text-[#8895A7] w-[100%] focus:bg-bg`}
                />
              </div>
            </div>
          </div>
          {/* ACCOUNT NAME */}

          <div className="acct-form">
            {/* BANK NAME */}
            <div className="account-form_inputs input_1">
              <p className="account-form_inputs-title">Bank Name</p>
              <div className="account-form_inputs-dropdown flex items-center justify-between">
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  className={`${
                    selectedBank && "text-black"
                  } acct-dropdown w-full px-4 py-2.5 text-left inline-flex items-center justify-between`}
                  type="button"
                >
                  {selectedBank ? selectedBank : "— Select —"}
                  <ArrowDown />
                </button>
                <div
                  id="dropdown"
                  className="hidden z-10 w-[250px] h-[300px] overflow-auto list-none bg-white rounded divide-y divide-gray-100 shadow-md"
                >
                  <ul className="py-1" aria-labelledby="dropdownButton">
                    {banks.map((bank, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          className="block w-[100%] text-left py-2 px-4 text-sm text-[#212934] hover:bg-[#F0FFFC]"
                          onClick={() => {
                            setSelectedBank(bank);
                          }}
                        >
                          {bank}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* BANK NAME END*/}

            {/* BANK ACCOUNT NUMBER IBAN */}
            <div className="account-form_inputs">
              <p className="account-form_inputs-title">
                Bank Account Number (IBAN)
              </p>
              <div className="account-form_inputs-label flex items-center">
                <input
                  type="text"
                  value={iban}
                  onChange={(e) => {
                    setIban(e.target.value);
                  }}
                  placeholder="XXXXXXXXXX"
                  className={`${
                    iban && "text-black"
                  } placeholder:text-[#8895A7] w-[100%] focus:bg-bg`}
                />
              </div>
            </div>
          </div>
          {/* BANK ACCOUNT NUMBER END */}

          <div className="acct-form">
            {/* ACCOUNT TYPE */}
            <div className="account-form_inputs input_1">
              <p className="account-form_inputs-title">Account Type</p>
              <div className="account-form_inputs-dropdown flex items-center justify-between">
                <button
                  type="button"
                  id="dropdownButton2"
                  data-dropdown-toggle="dropdown2"
                  className={`${
                    selectAccType && "text-black"
                  } acct-dropdown w-full px-4 py-2.5 text-left inline-flex items-center justify-between`}
                >
                  {selectAccType ? selectAccType : "— Select —"}
                  <ArrowDown />
                </button>
                <div
                  id="dropdown2"
                  className="hidden z-10 w-48 list-none bg-white rounded divide-y divide-gray-100 shadow"
                >
                  <ul className="py-1" aria-labelledby="dropdownButton2">
                    {accTypes.map((accType, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          className="block py-2 px-4 text-sm text-[#212934] hover:bg-[#F0FFFC]"
                          onClick={() => {
                            setSelectAccType(accType);
                          }}
                        >
                          {accType}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* ACCOUNT TYPE END */}
            <div className="account-form_inputs">
              <p className="account-form_inputs-title text-[#8895A7]">
                BIC / SWIFT Code
              </p>
              <div className="account-form_inputs-label flex items-center">
                <input
                  type="text"
                  disabled="true"
                  placeholder="XXXXXXXX"
                  value={swiftCode}
                  onChange={(e) => {
                    setSwiftCode(e.target.value);
                  }}
                  className={`${
                    iban && "text-black"
                  } placeholder:text-[#8895A7] w-[100%] focus:bg-bg`}
                />
              </div>
            </div>
            {/* ACCOUNT TYPE END */}
          </div>

          {/* SAVE ACCOUNT BUTTON */}
          <div className="flex items-center justify-start md:justify-end">
            <Button
              type="submit"
              className="account-button"
              disabled={loading}
              loading={loading}
            >
              {loading ? "Saving" : "Save bank details"}
            </Button>
          </div>
          {/* SAVE ACCOUNT BUTTON END */}
        </form>
      </div>

      <div className="accountss">
        <p className="title">My bank accounts</p>
        {bankDetails ? (
          <>
            {bankDetails?.userBankDetails?.map((details, index) => (
              <div key={index} className="accountss-item">
                <div className="accountss-item_one">
                  <p>
                    Account name:{" "}
                    <span className="values">{details?.acctName}</span>
                  </p>
                  <p>
                    Account number:{" "}
                    <span className="values">{details?.acctNumber}</span>
                  </p>
                  {/* <p>
                    BIC / SWIFT Code: <span className="values">FBNINGLA</span>
                  </p> */}
                  <p>
                    Bank Name:{" "}
                    <span className="values">{details?.acctBank}</span>
                  </p>
                </div>
                <button className="accountss-item_remove">
                  <Trash className="mr-[12px]" /> Remove
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className="accountss-item">
            <div className="accountss-item_one">
              <p>NO RECORDS FOUND</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
