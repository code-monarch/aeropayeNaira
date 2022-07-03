import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Search } from "../../assets/dashboard-icons/Left_ Icon.svg";
import { ReactComponent as Funnel } from "../../assets/dashboard-icons/Funnel.svg";
import { ReactComponent as Arrow } from "../../assets/dashboard-icons/arrow-down.svg";
import { ReactComponent as Tick } from "../../assets/icons/tick.svg";
import { PassengerFlightFilter } from "../../data/dropdown-options";
import OngoingFlight from "./components/OngoingFlight";
import FlightsInfo from "./components/AllFlight";
import RefundModal from "./components/RefundModal";
import RefundedModal from "./components/RefundedModal";
import Layout from "../../component/Layout";

const Flight = () => {
  const [showOption, setShowOption] = useState(false);
  const [filter, setFilter] = useState("All");
  const [tick, setTick] = useState(null);

  const [checkedIn, setCheckedIn] = useState(false);

  // Show mobile filter for screens smaller than 768px or resized to that size
  const [showMobileFilter, setShowMobileFilter] = useState(
    window.matchMedia("(max-width:768x)").matches
  );

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [openCancelModal, setOpenCancelModal] = useState(false);
  const onOpenCancelModal = () => setOpenCancelModal(true);
  const onCloseCancelModal = () => setOpenCancelModal(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const [openRefundModal, setOpenRefundModal] = useState(false);
  const onOpenRefundModal = () => setOpenRefundModal(true);
  const onCloseRefundModal = () => setOpenRefundModal(false);

  const [openRefundedModal, setOpenRefundedModal] = useState(false);
  const onOpenRefundedModal = () => setOpenRefundedModal(true);
  const onCloseRefundedModal = () => setOpenRefundedModal(false);
  const [isRefunded, setIsRefunded] = useState(false);

  const onChecked = () => setCheckedIn(true);
  const onCanceled = () => setIsCanceled(true);
  const onClaimedRefund = () => setIsRefunded(true);

  // Show mobile view for screens smaller than 768px or resized to that size
  const [mobileView, setMobileView] = useState(
    window.matchMedia("(max-width:1279px)").matches
  );

  const showTick = (a) => {
    PassengerFlightFilter.forEach((item, index) => {
      if (a === index) {
        setTick(index);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setShowMobileFilter(window.matchMedia("(max-width:768px)").matches);
    });
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setMobileView(window.matchMedia("(max-width:1279px)").matches);
    });
  });
  return (
    <div className="w-[100vw]">
      <Layout>
        <div
          className={`${
            showMobileFilter
              ? "!px-[18px] !pt-[16px]"
              : " flight !pt-[72px] w-screen"
          }`}
        >
          <div className="flight-container">
            {/* Flight Container Navs */}
            <div
              className={`${
                mobileView && "!w-full flex justify-between"
              } flex items-center flight-container-navs`}
            >
              <label
                className={`${
                  showMobileFilter && "!mr-[8px] !w-[90%]"
                } search-table border-[1px] border-[#E1E7EC]`}
              >
                <span className="mx-[4px]">
                  <Search />
                </span>
                <input type="search" placeholder="Search flights by ID" />
              </label>

              <button
                className={`${
                  showMobileFilter
                    ? "mobile-filter-table relative border-[1px] border-[#E1E7EC]"
                    : "filter-table relative border-[1px] border-[#E1E7EC]"
                }relative border-[1px] border-[#E1E7EC]`}
                onClick={() => setShowOption(!showOption)}
              >
                <div
                  className={`${
                    showMobileFilter
                      ? "flex items-center justify-center !px-0"
                      : "flex items-center justify-between"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Funnel
                      className={`${showMobileFilter ? "mx-0" : "mx-[8px]"}`}
                    />
                    {!showMobileFilter && (
                      <span className="filter-name whitespace-nowrap">
                        {filter} flights
                      </span>
                    )}
                  </div>
                  {!showMobileFilter && (
                    <div>
                      <Arrow />
                    </div>
                  )}
                </div>

                {/* Dropdown Options */}
                {showOption && (
                  <ul
                    className={`filter-dropdown ${
                      showMobileFilter
                        ? "absolute top-12 left-0"
                        : "absolute top-12 right-0"
                    } z-[9999]`}
                  >
                    {PassengerFlightFilter.map((i, index) => (
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
                {/* Dropdown Options End */}
              </button>

              {!showMobileFilter && (
                <>
                  <Link
                    to="/flights/book-flight"
                    className="book-button whitespace-nowrap"
                  >
                    Book a flight
                  </Link>
                  <Link
                    to="/flights/paid-flights"
                    className="payed-button ml-[30px] whitespace-nowrap"
                  >
                    Paid flights
                  </Link>
                </>
              )}
            </div>
            {/* Flight Container Navs End */}

            <div className="flex flex-col">
              {/* <div className="flight-container_timeline"></div> */}

              {filter === "All" ? (
                <FlightsInfo
                  onCanceled={onCanceled}
                  checkedIn={checkedIn}
                  open={open}
                  onOpenModal={onOpenModal}
                  onCloseModal={onCloseModal}
                  onCloseCancelModal={onCloseCancelModal}
                  openCancelModal={openCancelModal}
                  onOpenCancelModal={onOpenCancelModal}
                  isCanceled={isCanceled}
                  onOpenRefundModal={onOpenRefundModal}
                  isRefunded={isRefunded}
                  filter={filter}
                />
              ) : filter === "Ongoing" ? (
                <OngoingFlight
                  checkedIn={checkedIn}
                  onOpenModal={onOpenModal}
                  onOpenCancelModal={onOpenCancelModal}
                  isCanceled={isCanceled}
                  onOpenRefundModal={onOpenRefundModal}
                  isRefunded={isRefunded}
                />
              ) : (
                "canceled"
              )}
            </div>
          </div>
        </div>

        <RefundModal
          openRefundModal={openRefundModal}
          onCloseRefundModal={onCloseRefundModal}
          onOpenRefundedModal={onOpenRefundedModal}
        />

        <RefundedModal
          openRefundModal={openRefundedModal}
          onCloseRefundedModal={onCloseRefundedModal}
          onClaimedRefund={onClaimedRefund}
        />
      </Layout>
    </div>
  );
};

export default Flight;
