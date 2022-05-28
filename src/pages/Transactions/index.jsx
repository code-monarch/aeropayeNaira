import React, { useState, useEffect } from "react";
import { ReactComponent as Search } from "../../assets/dashboard-icons/Left_ Icon.svg";
import { ReactComponent as Funnel } from "../../assets/dashboard-icons/Funnel.svg";
import { ReactComponent as Arrow } from "../../assets/dashboard-icons/arrow-down.svg";
import { ReactComponent as ArrDown } from "../../assets/dashboard-icons/Down.svg";
import { ReactComponent as Tick } from "../../assets/icons/tick.svg";
import { Filter } from "../../data/dropdown-options";
import Layout from "../../component/Layout";

const Transaction = () => {
  const [isActive, setIsActive] = useState("trans");
  const [showOption, setShowOption] = useState(false);
  const [filter, setFilter] = useState(" Filter by type");
  const [tick, setTick] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(
    window.matchMedia("(max-width:530px)").matches
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setShowMobileFilter(window.matchMedia("(max-width:530px)").matches);
    });
  });

  const showTick = (a) => {
    console.log(a);
    Filter.forEach((item, index) => {
      if (a === index) {
        setTick(index);
      }
    });
  };

  return (
    <>
      <Layout>
        <section className="table_contain">
          <div className="table-container">
            <div className="flex items-center mb-[16px]">
              <label className="mr-[16px] search-table">
                <span className="mx-[4px]">
                  <Search />
                </span>
                <input type="search" placeholder="Search transaction" />
              </label>

              {showMobileFilter ? (
                <button
                  className="mobile-filter-table relative"
                  onClick={() => setShowOption(!showOption)}
                >
                  <div className="flex items-center justify-center">
                    <Funnel />
                  </div>

                  {showOption && (
                    <ul className="filter-dropdown absolute top-12 z-[9999] right-0 ">
                      {Filter.map((i, index) => (
                        <li
                          key={index}
                          className={`${tick === index ? "selected" : ""}`}
                        >
                          <button
                            className="flex items-center"
                            onClick={() => {
                              setFilter(i);
                              showTick(index);
                            }}
                          >
                            <Tick
                              className={`mr-2 ${
                                tick === index ? "visible" : "invisible"
                              }`}
                            />
                            {i}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              ) : (
                <button
                  className="filter-table relative"
                  onClick={() => setShowOption(!showOption)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Funnel className="mx-[8px]" />
                      <span className="filter-name">{filter}</span>
                    </div>

                    <div>
                      <Arrow />
                    </div>
                  </div>

                  {showOption && (
                    <ul className="filter-dropdown absolute top-12 z-[9999] left-0 ">
                      {Filter.map((i, index) => (
                        <li
                          key={index}
                          className={`${tick === index ? "selected" : ""}`}
                        >
                          <button
                            className="flex items-center"
                            onClick={() => {
                              setFilter(i);
                              showTick(index);
                            }}
                          >
                            <Tick
                              className={`mr-2 ${
                                tick === index ? "visible" : "invisible"
                              }`}
                            />
                            {i}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              )}
            </div>

            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-md sm:rounded-lg">
                    <table className="min-w-full table">
                      <thead className="table-head">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item"
                          >
                            <div className="flex items-center">
                              id <ArrDown />
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item"
                          >
                            <div className="flex items-center">
                              date <ArrDown />
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item"
                          >
                            <div className="flex items-center">
                              type <ArrDown />
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item"
                          >
                            <div className="flex items-center">
                              description <ArrDown />
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item w-[150px]"
                          >
                            <div className="flex items-center">
                              amount <ArrDown />
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item"
                          >
                            <div className="flex items-center">
                              status <ArrDown />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b odd:bg-white even:bg-[#F7FAFC;] dark:border-gray-600 table-body">
                          <td className="table-body_items whitespace-nowrap dark:text-white">
                            A00000000
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Feb 4, 2022, 10:59 AM
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Withdrawal
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Withdrawal to bank account
                          </td>
                          <td className="table-body_items whitespace-nowrap w-[150px]dark:text-gray-400 text-right">
                            <p>250,500</p>
                            <p className="rates">≈ 441.5201 Aeropaye</p>
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            <p className="status-completed">Completed</p>
                          </td>
                        </tr>

                        <tr className="border-b odd:bg-white even:bg-[#F7FAFC;] dark:border-gray-600 table-body">
                          <td className="table-body_items whitespace-nowrap dark:text-white">
                            A00000000
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Feb 4, 2022, 10:59 AM
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Deposit
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Funding wallet via paystack
                          </td>
                          <td className="table-body_items whitespace-nowrap w-[150px]dark:text-gray-400 text-right">
                            <p>180.6789</p>
                            <p className="rates">≈ 102,000.00 NGN</p>
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            <p className="status-pending">Pending</p>
                          </td>
                        </tr>

                        <tr className="border-b odd:bg-white even:bg-[#F7FAFC;] dark:border-gray-600 table-body">
                          <td className="table-body_items whitespace-nowrap dark:text-white">
                            A00000000
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Feb 4, 2022, 10:59 AM
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Smart contract
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Smart contract call
                          </td>
                          <td className="table-body_items whitespace-nowrap w-[150px]dark:text-gray-400 text-right">
                            <p>1.0000</p>
                            <p className="rates">≈ 600.00 NGN</p>
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            <p className="status-completed">Completed</p>
                          </td>
                        </tr>

                        <tr className="border-b odd:bg-white even:bg-[#F7FAFC;] dark:border-gray-600 table-body">
                          <td className="table-body_items whitespace-nowrap dark:text-white">
                            A00000000
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Feb 4, 2022, 10:59 AM
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Booking
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Booking paid: [Airline_name]
                          </td>
                          <td className="table-body_items whitespace-nowrap w-[150px]dark:text-gray-400 text-right">
                            <p>43.8596</p>
                            <p className="rates">≈ 25,000.00 NGN</p>
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            <p className="status-completed">Completed</p>
                          </td>
                        </tr>

                        <tr className="border-b odd:bg-white even:bg-[#F7FAFC;] dark:border-gray-600 table-body">
                          <td className="table-body_items whitespace-nowrap dark:text-white">
                            A00000000
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Feb 4, 2022, 10:59 AM
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Refund
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Refund paid: [Airline_name]
                          </td>
                          <td className="table-body_items whitespace-nowrap w-[150px]dark:text-gray-400 text-right">
                            <p>20,500</p>
                            <p className="rates">≈ 35.0877 Aeropaye</p>
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            <p className="status-completed">Completed</p>
                          </td>
                        </tr>

                        <tr className="border-b odd:bg-white even:bg-[#F7FAFC;] dark:border-gray-600 table-body">
                          <td className="table-body_items whitespace-nowrap dark:text-white">
                            A00000000
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Feb 4, 2022, 10:59 AM
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Send
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Sent token
                          </td>
                          <td className="table-body_items whitespace-nowrap w-[150px]dark:text-gray-400 text-right">
                            <p>25.0000</p>
                            <p className="rates">≈ 14,250.00 NGN</p>
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            <p className="status-completed">Completed</p>
                          </td>
                        </tr>

                        <tr className="border-b odd:bg-white even:bg-[#F7FAFC;] dark:border-gray-600 table-body">
                          <td className="table-body_items whitespace-nowrap dark:text-white">
                            A00000000
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Feb 4, 2022, 10:59 AM
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Receive
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            Received token
                          </td>
                          <td className="table-body_items whitespace-nowrap w-[150px]dark:text-gray-400 text-right">
                            <p>100.5000</p>
                            <p className="rates">≈ 58,000.00 NGN</p>
                          </td>
                          <td className="table-body_items whitespace-nowrap dark:text-gray-400">
                            <p className="status-completed">Completed</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Transaction;
