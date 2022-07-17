import React, { useState } from "react";
// import ReactFlagsSelect from "react-flags-select";
import { ReactComponent as ArrowDown } from "../../../assets/dashboard-icons/arrow-down.svg";
import { ReactComponent as Trash } from "../../../assets/dashboard-icons/trash.svg";
import Button from "../../../component/shared/Button";

// import { Controller, useForm } from "react-hook-form";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";

import { useMutation, useQuery } from "@apollo/client";
import { BANK_DETAILS_MUTATION } from "../../../hooks";
import { GET_BANK_DETAILS } from "../../../hooks";
import { banks, accTypes, countries } from "../data";

// import FormError from "../../../component/shared/FormError";

const Account = () => {
  const [focus, setFocus] = useState("");

  //   const [openDropdown, setOpenDropdown] = useState(false)
  const [selectCountry, setSelectCountry] = useState();
  const [accName, setAccName] = useState();
  const [selectedBank, setSelectedBank] = useState();
  const [selectAccType, setSelectAccType] = useState();
  const [swiftCode, setSwiftCode] = useState();
  const [iban, setIban] = useState();

  //Bank Details Mutation
  const [userBankDetails, { loading }] = useMutation(
    BANK_DETAILS_MUTATION,
    {
      refetchQueries: [
        { query: GET_BANK_DETAILS }, // DocumentNode object parsed with gql
        "userBankDetails", // Query name
      ],
    }
  );
  //Bank Details Query
  const {
    data: bankDetails,
  } = useQuery(GET_BANK_DETAILS);
  console.log("bank details", bankDetails)

  // const bankdetailsLength = bankDetails?.userBankDetails
  // console.log("bankdetailslength", bankdetailsLength?.length)

  let bankdetailsLength = Boolean(
    Array.isArray(bankDetails?.userBankDetails) &&
      bankDetails?.userBankDetails.length
  );

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
                toastSuccess(`${res?.data?.userBankDetails?.message}`);
                console.log("Bank details response:", res);
                setSelectCountry("");
                setAccName("");
                setSelectedBank("");
                setIban("");
                setSelectAccType("");
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
              <div
                className={`account-form_inputs-dropdown flex items-center justify-between ${
                  focus === "dropdownButton6" ? "clicked" : ""
                }`}
                onClick={() => setFocus("dropdownButton6")}
              >
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
            <div className={`account-form_inputs`}>
              <p className="account-form_inputs-title"> Name on account</p>
              <label
                htmlFor="accName"
                className={`${"account-form_inputs-label flex items-center"} ${
                  focus === "accName" ? "clicked" : ""
                }`}
              >
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
                  } placeholder:text-[#8895A7] w-[100%]`}
                  onBlur={() => setFocus("")}
                  onFocus={() => setFocus("accName")}
                />
              </label>
            </div>
          </div>
          {/* ACCOUNT NAME */}

          <div className="acct-form">
            {/* BANK NAME */}
            <div className="account-form_inputs input_1">
              <p className="account-form_inputs-title">Bank Name</p>
              <div
                className={`account-form_inputs-dropdown flex items-center justify-between ${
                  focus === "dropdown_bankName" ? "clicked" : ""
                }`}
                onClick={() => setFocus("dropdown_bankName")}
              >
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown_bankName"
                  className={`${
                    selectedBank && "text-black"
                  } acct-dropdown w-full px-4 py-2.5 text-left inline-flex items-center justify-between`}
                  type="button"
                >
                  {selectedBank ? selectedBank : "— Select —"}
                  <ArrowDown />
                </button>
                <div
                  id="dropdown_bankName"
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
              <label
                className={`${"account-form_inputs-label flex items-center"} ${
                  focus === "account number" ? "clicked" : ""
                }`}
              >
                <input
                  type="text"
                  value={iban}
                  onChange={(e) => {
                    setIban(e.target.value);
                  }}
                  placeholder="XXXXXXXXXX"
                  className={`${
                    iban && "text-black"
                  } placeholder:text-[#8895A7] w-[100%] h-[100%]`}
                  onBlur={() => setFocus("")}
                  onFocus={() => setFocus("account number")}
                />
              </label>
            </div>
          </div>
          {/* BANK ACCOUNT NUMBER END */}

          <div className="acct-form">
            {/* ACCOUNT TYPE */}
            <div className="account-form_inputs input_1">
              <p className="account-form_inputs-title">Account Type</p>
              <div
                className={`account-form_inputs-dropdown flex items-center justify-between ${
                  focus === "dropdown_acctType" ? "clicked" : ""
                }`}
                onClick={() => setFocus("dropdown_acctType")}
              >
                <button
                  type="button"
                  id="dropdown_acctType"
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
                          className="block py-2 px-4 text-sm text-[#212934] !mr-0 hover:bg-[#F0FFFC]"
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
            {/* SWIFT CODE */}
            <div className="account-form_inputs">
              <p className="account-form_inputs-title text-[#8895A7]">
                BIC / SWIFT Code
              </p>
              <div className="account-form_inputs-label flex items-center">
                <input
                  type="text"
                  disabled={true}
                  placeholder="XXXXXXXX"
                  value={swiftCode}
                  onChange={(e) => {
                    setSwiftCode(e.target.value);
                  }}
                  className={`${
                    iban && "text-black"
                  } placeholder:text-[#8895A7] w-[100%] focus:bg-bg cursor-not-allowed`}
                />
              </div>
            </div>
            {/* SWIFT CODE END */}
          </div>

          {/* SAVE ACCOUNT BUTTON */}
          <div className="flex items-center justify-start md:justify-end">
            <Button
              type="submit"
              className="account-button !text-center"
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
        {bankDetails && (
          <>
            {bankDetails?.userBankDetails?.map((details, index) => (
              <div key={index} className="accountss-item">
                <div className="accountss-item_one">
                  <p className="!h-fit !mb-[8px]">
                    Account name:{" "}
                    <span className="values">{details?.acctName}</span>
                  </p>
                  <p className="!h-fit !mb-[8px]">
                    Account number:{" "}
                    <span className="values">{details?.acctNumber}</span>
                  </p>
                  {/* <p>
                    BIC / SWIFT Code: <span className="values">FBNINGLA</span>
                  </p> */}
                  <p className="!h-fit !mb-[8px]">
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
        )}{" "}
        {bankdetailsLength === false && (
          <div className="accountss-item">
            <div className="accountss-item_one">
              <p>NO RECORD FOUND</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
