import React, { useState, useEffect, useMemo } from "react";
import dateFormat from "dateformat";
import ReactPaginate from "react-paginate";
import { ReactComponent as Search } from "../../assets/dashboard-icons/Left_ Icon.svg";
import { ReactComponent as Funnel } from "../../assets/dashboard-icons/Funnel.svg";
import { ReactComponent as Arrow } from "../../assets/dashboard-icons/arrow-down.svg";
import { ReactComponent as ArrDown } from "../../assets/dashboard-icons/Down.svg";
import { ReactComponent as Tick } from "../../assets/icons/tick.svg";
import { Filter } from "../../data/dropdown-options";
import { ReactComponent as ArrowLeft } from "../../assets/dashboard-icons/arrow-left.svg";
// import { Link } from "react-router-dom";
import Layout from "../../component/Layout";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTION_HISTORY } from "../../hooks";

const style = {
  theadTh: `text-[12px] py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item`,
  pagination: `flex justify-between capitalize `,
  pageLink: `py-[6px] px-[13px] text-[14px]`,
  previousLink: `mr-[8px] text-[14px]`,
  nextLink: `ml-[8px] text-[14px]`,
  active: `bg-[#22E0BB] rounded-[4px]`,
};

const TableRow = ({ currentItems }) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  // Converts Milliseconds time to human readable Date
  const createdAtDate = (x) => {
    let date = new Date(x);
    return date.toLocaleDateString("en-GB");
  };
  // Converts Milliseconds time to human readable time
  const createdAtTime = (x) => {
    let date = new Date(x);
    return date.toLocaleTimeString("en-US");
  };
  return (
    <>
      {currentItems &&
        currentItems.map((items, index) => (
          <tr
            key={index}
            className="border-b odd:bg-white even:bg-[#F7FAFC;] dark:border-gray-600 table-body"
          >
            <td className="table-body_items whitespace-nowrap dark:text-white">
              {items?.id}
            </td>
            <td className="table-body_items whitespace-nowrap dark:text-gray-400">
              {`${createdAtDate(parseInt(items.createdAt))}, ${createdAtTime(
                parseInt(items.createdAt)
              )}`}
            </td>
            <td className="table-body_items whitespace-nowrap dark:text-gray-400">
              {items?.trxType}
            </td>
            <td className="table-body_items whitespace-nowrap dark:text-gray-400">
              {items?.description}
            </td>
            <td className="table-body_items pr-[15px] flex flex-col items-end justify-center whitespace-nowrap w-[150px] dark:text-gray-400">
              <p className="mr-[20px]">{`${numberWithCommas(items?.amount)} NGN`}</p>
              <p className="rates !mr-[20px]">
                {`≈${numberWithCommas(items?.amount)} ARP`}
              </p>
            </td>
            <td className="table-body_items whitespace-nowrap dark:text-gray-400">
              <p
                className={`${
                  items?.status === "Completed"
                    ? "status-completed"
                    : "status-pending"
                }`}
              >
                {items?.status}
              </p>
            </td>
          </tr>
        ))}
    </>
  );
};

const Transaction = () => {
  const [isActive, setIsActive] = useState("trans");
  const [showOption, setShowOption] = useState(false);
  const [filter, setFilter] = useState(" Filter by type");
  const [tick, setTick] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(
    window.matchMedia("(max-width:530px)").matches
  );

  //Query User Transaction history
  const {
    data: transactions,
  } = useQuery(GET_TRANSACTION_HISTORY);

  console.log("Transaction Data", transactions?.transactions);

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

  // Store GET_TRANSACTION_HISTORY Query response in a transaction variable
  const transactionVar = transactions?.transactions;

  // Memoize transaction to prevent Re-render
  const transaction = useMemo(
    () =>
      transactionVar?.map((transaction) => {
        return transaction;
      }),
    [transactionVar]
  );

  // PAGINATION
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 7;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(transaction?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(transaction?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, transaction]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % transactions?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  // PAGINATION END

  return (
    <>
      <Layout>
        {/* <Link to="/wallet" className="back-link">
              <ArrowLeft />
              <p className="back-link_nav">Back</p>
            </Link> */}
        <section className="table_contain !bg-bg w-full pt-[30px] lg:pt-[72px]">
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
                    <table className="min-w-full">
                      <thead className="table-head">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item"
                          >
                            <p className="flex items-center">
                              id <ArrDown />
                            </p>
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item"
                          >
                            <p className="flex items-center">
                              date <ArrDown />
                            </p>
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item"
                          >
                            <p className="flex items-center">
                              type <ArrDown />
                            </p>
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item"
                          >
                            <p className="flex items-center">
                              description <ArrDown />
                            </p>
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-right uppercase dark:text-gray-400 table-head_item w-[150px]"
                          >
                            <p className="flex items-center justify-end">
                              amount <ArrDown />
                            </p>
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 font-medium tracking-wider text-left uppercase dark:text-gray-400 table-head_item"
                          >
                            <p className="flex items-center">
                              status <ArrDown />
                            </p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <TableRow currentItems={currentItems} />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* React Paginate */}
              <div className="w-[100%] flex justify-end mt-[30px]">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  containerClassName={style.pagination}
                  pageLinkClassName={style.pageLink}
                  previousLinkClassName={style.previousLink}
                  nextLinkClassName={style.nextLink}
                  activeLinkClassName={style.active}
                />
              </div>
              {/* React Paginate End */}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Transaction;
