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
    window.matchMedia("(max-width:1023px)").matches
  );

  // Show Paid flights button in column
  const [colPaidBtn, SetColPaidBtn] = useState(
    window.matchMedia("(max-width:767px)").matches
  );

  // Show mobile filter for screens smaller than 768px or resized to that size
  const [desktopView, setDesktopView] = useState(
    window.matchMedia("(min-width:768px)").matches
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
      setDesktopView(window.matchMedia("(min-width:768px)").matches);
    });
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      SetColPaidBtn(window.matchMedia("(max-width:767px)").matches);
    });
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setMobileView(window.matchMedia("(max-width:1023px)").matches);
    });
  });
  return (
    <Layout>
      <div
        className={`${
          desktopView && "!pt-[72px] !pl-[32px] w-full"
        } bg-bg min-h-screen px-[18px] pt-[30px] w-full md:flight lg:pt-[72px]`}
      >
        <div
          className={`${mobileView && "!flex !flex-col !items-center"} ${
            desktopView && "!flex !flex-col !items-start"
          } flight-container`}
        >
          {/* Flight Container Navs */}
          <div
            className={`sm:max-w-[600px] !w-full xl:max-w-[827px] !flex !items-center !justify-center flight-container-navs`}
          >
            <div className="flex flex-col sm:max-w-[600px] !w-full xl:max-w-[827px]">
              <label
                className={`${
                  mobileView && "!w-full md:w-full"
                } search-table border-[1px] border-[#E1E7EC]`}
              >
                <span className="mx-[4px]">
                  <Search />
                </span>
                <input type="search" placeholder="Search flights by ID" />
              </label>
              {/* Display Paid Flight Button when width => 900px */}
              <Link
                to="/flights/paid-flights"
                className={`${
                  colPaidBtn
                    ? "payed-button !w-full !ml-0 mt-[10px] whitespace-nowrap !rounded-[4px]"
                    : "hidden"
                }`}
              >
                Paid flights
              </Link>
            </div>

            {/* {!mobileView ? ( 
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
                </div> */}

            {/* Dropdown Options */}
            {/* {showOption && (
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
                )} */}
            {/* Dropdown Options End */}
            {/* </button>
              ): ""} */}

            <>
              <Link
                to="/flights/book-flight"
                className={`${
                  desktopView
                    ? "book-button whitespace-nowrap ml-[30px]"
                    : "hidden"
                }`}
              >
                Book a flight
              </Link>
              <Link
                to="/flights/paid-flights"
                className={`${
                  desktopView
                    ? "payed-button ml-[15px] whitespace-nowrap"
                    : "hidden"
                }`}
              >
                Paid flights
              </Link>
            </>
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
  );
};

export default Flight;
