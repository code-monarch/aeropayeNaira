import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Search } from "../../assets/dashboard-icons/Left_ Icon.svg";
import { ReactComponent as Funnel } from "../../assets/dashboard-icons/Funnel.svg";
import { ReactComponent as Arrow } from "../../assets/dashboard-icons/arrow-down.svg";
import { ReactComponent as Tick } from "../../assets/icons/tick.svg";
import { PassengerFlightFilter } from "../../data/dropdown-options";
import OngoingFlight from "./components/OngoingFlight";
import FlightsInfo from "./components/AllFlight";
import CheckInModal from "./components/CheckInModal";
import CancelModal from "./components/CancelModal";
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

  const showTick = (a) => {
    PassengerFlightFilter.forEach((item, index) => {
      if (a === index) {
        setTick(index);
      }
    });
  };
  return (
    <>
      <Layout>
        <div className="flight">
          <div className="flight-container">
            {/* Flight Container Navs */}
            <div className="flex items-center flight-container-navs">
              <label className="search-table border-[1px] border-[#E1E7EC]">
                <span className="mx-[4px]">
                  <Search />
                </span>
                <input type="search" placeholder="Search flights by ID" />
              </label>

              <button
                className="filter-table relative border-[1px] border-[#E1E7EC]"
                onClick={() => setShowOption(!showOption)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Funnel className="mx-[8px]" />
                    <span className="filter-name">{filter} flights</span>
                  </div>

                  <div>
                    <Arrow />
                  </div>
                </div>

                {showOption && (
                  <ul className="filter-dropdown absolute top-12 z-[9999] left-0 ">
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
              </button>

              <Link to="/flights/book-flight" className="book-button">
                Book a flight
              </Link>
              <Link
                to="/flights/payed-flights"
                className="payed-button ml-[30px]"
              >
                Go to Payed flights
              </Link>
            </div>
            {/* Flight Container Navs End */}

            <div className="flex">
              <div className="flight-container_timeline"></div>

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
    </>
  );
};

export default Flight;
