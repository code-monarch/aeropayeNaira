import React, { useState, useRef, useEffect } from "react";
import {
  WarningIcon,
  AeroLogo,
  AirArikLogo,
  AirIbomLogo,
  AirPeaceLogo,
  DanaLogo,
  MobileLineIcon,
  ArrIcon,
  PlaneIcon,
  ProfileIcon,
  WhiteCalenderIcon,
  BusinessClassIcon,
  EcoClassIcon,
  PremiumEcoClassIcon,
  FirstClassIcon,
} from "./";
import CancelModal from "../components/CancelModal";
import CheckInModal from "../components/CheckInModal";
import { toastError } from "../../../component/shared/Toasts";
import dateFormat from "dateformat";

import { GET_AVAILABLE_FLIGHTS, GET_BOOKED_FLIGHTS } from "../../../hooks";
import { useQuery } from "@apollo/client";

const MobileItinerary = () => {
  // saves itinerarRef which is passed to BookingDetails component
  const [itinerary, setItinerary] = useState("");
  const itineraryRef = useRef(null);
  const ref = useRef(null);

  // Get Passenger Booked Flights
  const { data: bookedFlights, loadingBookedFlights } =
    useQuery(GET_BOOKED_FLIGHTS);
  console.log("UserBooked Flights:", bookedFlights);

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

  const [showBookingSummary, setShowBookingSummary] = useState(false);

  const openBookingModal = () => {
    setShowBookingSummary(true);
  };
  const closeBookingModal = () => setShowBookingSummary(false);

  // Show mobile view for screens smaller than 768px or resized to that size
  const [mobileView, setMobileView] = useState(
    window.matchMedia("(max-width:900px)").matches
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      setMobileView(window.matchMedia("(max-width:900px)").matches);
    });
  });
  // Show mobile view for screens smaller than 360px or resized to that size
  const [smallMobile, setSmallMobile] = useState(
    window.matchMedia("(max-width:360px)").matches
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSmallMobile(window.matchMedia("(max-width:360px)").matches);
    });
  });

  // This function maps through passenger booked flights and gets all passenger Booked Flights flightCodse and then stores them in an array
  const flights = bookedFlights?.getBookedFlight?.map((flight) => {
    return {
      flightCode: flight?.flightCode,
    };
  });

  // This function gets the flight a passenger has chosen to check in by
  // returning a new array(containing the flight details) if a FlightCode in the Flights array === Itinerary flightCode(setItinerary)
  let flightToCheckIn = flights?.find(
    (item) => item.flightCode === itinerary?.flightCode
  );
  console.log("flightToCheckIn", flightToCheckIn);

  ref.current = flightToCheckIn;
  console.log("current Ref: ", ref.current);

  // Get Available Flights
  const { loading, error, data } = useQuery(GET_AVAILABLE_FLIGHTS);
  console.log("getAvailable flights data", data?.getAvailableFlights);

  if (loading) {
    console.log(loading, "loading");
  }
  if (error) {
    console.log(error, "error");
  }
  console.log(data, "available flights");
  return (
    <div className="w-full sm:max-w-[600px] flex flex-col items-center">
      {(!bookedFlights || bookedFlights?.getBookedFlight.length === 0) && (
        <div className="flight-container_information !mr-0">
          <div className="section h-[200px] flex justify-center !flex-col items-center">
            <div className="body !text-[20px] font-sans !font-bold">
              {" "}
              No flights found{" "}
            </div>
            <div className="body font-sans">
              {" "}
              You haven't paid for any flight.{" "}
            </div>
          </div>
        </div>
      )}
      {bookedFlights &&
        bookedFlights?.getBookedFlight?.map((bookedFlight) => (
          <div
            className="flex flex-col items-center lg:items-start"
            key={bookedFlight.ticketId}
            ref={ref}
          >
            {/* Warning */}
            <div className="w-full bg-[#fff6ed] flex items-center py-[9px] px-[13px] mb-[16px] border-[1px] border-[#fce3b9] rounded-[4px]">
              <WarningIcon className={`${mobileView && "w-[40px]"}`} />
              <p className="font-serif font-[400] text-[10px] sm:text-[12px] md:text-[14px] text-black ml-[10px]">
                The availability of this flight will expire in <b>23:30:12 </b>
                if payment is not being made.
              </p>
            </div>
            {/* Itinerary */}
            <div className="flex flex-col items-center w-full rounded-[8px] mb-[32px] shadow-custom">
              {/* Header */}
              <div className="bg-black w-full font-sans text-[14px] text-white font-[500] px-[16px] py-[10px] flex flex-row justify-between items-center rounded-t-[8px]">
                {/* Top */}
                <div className="flex flex-col">
                  <div className="flex flex-row items-center">
                    <p className="text-[12px] sm:text-[14px] md:text-[16px] whitespace-nowrap">
                      Itinerary :
                    </p>
                    <div className="flex items-center text-[12px] sm:text-[14px] whitespace-nowrap">
                      &nbsp;&nbsp; {bookedFlight.departureCity} &nbsp;&nbsp;
                      <ArrIcon className="w-[15px] h-[13px] sm:w-[16px] sm:h-[15px] md:w-[19px] md:h-[17px]" />{" "}
                      &nbsp;&nbsp; {bookedFlight.arrivalCity}
                    </div>
                  </div>
                  <div className="flex items-center mt-[5px]">
                    <div className="mr-[5px]">
                      <WhiteCalenderIcon />
                    </div>
                    <p className="text-[12px] sm:text-[14px]">
                      {bookedFlight?.departureDate}
                    </p>
                  </div>
                  <p className="mt-[10px] text-[12px] sm:text-[14px]">
                    Ticketless ID: {bookedFlight.ticketId}
                  </p>
                </div>
                <div className="bg-[#515964] text-[12px] flex justify-center self-end sm:self-center items-center h-[28px] py-[7px] px-[12px] rounded-[4px] whitespace-nowrap">
                  <div className="mr-[8px]">
                    <PlaneIcon className="w-[15px] h-[13px]" />
                  </div>
                  One-way
                </div>
              </div>
              {/* Body */}
              <div className="w-full flex flex-col items-center">
                {/* Departure and Arrival Info */}
                {/* <div className="bg-[#EDFFF9] w-full flex flex-col text-black px-[18px] py-[11px]">
                <div className="flex items-center text-[12px] sm-text-[14px] md:text-[16px] mb-[16px]">
                  <div className="!mr-[12px]">
                    <DepartureIcon />
                  </div>
                  Departure:
                  <span className="mx-[12px] text-[12px] sm:text-[14px]">
                    {bookedFlight?.departureCity}
                  </span>
                  <ArrRightIcon className="w-[15px] h-[13px] sm:w-[17px] sm:h-[15px] md:w-[19px] md:h-[17px]" />
                  <span className="mx-[12px] text-[12px] sm:text-[14px]">
                    {bookedFlight?.arrivalCity}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-[12px]">
                    <CalendarIcon />
                  </div>
                  <p className="text-[12px] sm:text-[14px]">
                    {dateFormat(bookedFlight?.departureDate, "mmmm dS, yyyy")}
                  </p>
                </div>
              </div> */}
                {/* Flight details */}
                <div className="bg-white w-full flex flex-row justify-between px-[17px] py-[22px]">
                  {/* Left side */}
                  <div className="flex flex-col justify-between sm:ml-[30px] my-[20px]">
                    <p className="font-sans font-[500] text-[18px]">
                      {bookedFlight?.departureTime}
                    </p>
                    <p className="font-sans font-[500] text-[18px]">
                      {bookedFlight?.arrivalTime}
                    </p>
                  </div>
                  {/* Left Side End */}
                  {/* Middle Side */}
                  <div className="flex items-center ml-[-16px] mr-[24px]">
                    <p className="mr-[24px] text-[10px] text-[#8895A7] whitespace-nowrap">
                      1h 30m <br />0 Stops
                    </p>
                    <MobileLineIcon className="h-full" />
                  </div>
                  {/* Middle Side end */}
                  {/* Right Side */}
                  <div className="flex flex-col justify-between sm:mr-[25px]">
                    {/* Departure City */}
                    <div>
                      <p className="text-[14px] sm:text-[18px] mb-[4px]">
                        {bookedFlight?.departureCity}
                      </p>
                      <p className="text-[10px] text-[#8895A7] max-w-[100px]">
                        Murtala Muhammed International Airport (Nigeria)
                      </p>
                    </div>
                    <div
                      className={`${
                        smallMobile
                          ? "flex flex-col my-[34px]"
                          : "flex flex-row items-center my-[34px]"
                      }`}
                    >
                      <div className="flex items-center w-[57px] mr-[16px] px-[6px] py-[2px] border-[0.5px] border-[#8895A7] rounded-[8px] shadow-none">
                        {bookedFlight?.airlineName === "Air Peace" && (
                          <AirPeaceLogo />
                        )}
                        {bookedFlight?.airlineName === "Ibom Air" && (
                          <AirIbomLogo />
                        )}
                        {bookedFlight?.airlineName === "Arik Air" && (
                          <AirArikLogo />
                        )}
                        {bookedFlight?.airlineName === "Dana Air" && (
                          <DanaLogo />
                        )}
                        {bookedFlight?.airlineName === "Aero" && <AeroLogo />}
                      </div>
                      <div
                        className={`${
                          smallMobile ? "w-[55px] mt-[10px]" : "w-[67px]"
                        }`}
                      >
                        {bookedFlight?.class === "ECONOMY" && <EcoClassIcon />}
                        {bookedFlight?.class === "FIRST_CLASS" && (
                          <FirstClassIcon />
                        )}
                        {bookedFlight?.class === "BUSINESS" && (
                          <BusinessClassIcon />
                        )}
                        {bookedFlight?.class === "PREMIUM_ECONOMY" && (
                          <PremiumEcoClassIcon />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-[14px] sm:text-[18px] mb-[4px]">
                        {bookedFlight?.arrivalCity}
                      </p>
                      <p className="text-[10px] text-[#8895A7] max-w-[100px]">
                        Nnamdi Azikwe Airport (Nigeria)
                      </p>
                    </div>
                  </div>
                  {/* Right Side End */}
                </div>
                {/* Flight details End */}
                {/* Passenger Details */}
                <div className="w-full p-[20px]">
                  <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center text-left">
                    <div className="flex items-center mb-[28px] sm:mb-0">
                      <ProfileIcon className="w-[25px] h-[20px] mr-[5px]" />
                      <p className="text-[12px]">
                        Passengers:
                        <span className="mx-[8px]">
                          {bookedFlight.userFirstName}&nbsp;
                          {bookedFlight.userLastName},
                        </span>
                      </p>
                    </div>{" "}
                    {isRefunded ? (
                      <div className="refund-claim">
                        <p>Refund has been claimed for this flight</p>
                      </div>
                    ) : (
                      <div>
                        {bookedFlight?.checkedIn ? (
                          <button
                            className="h-[42px] flex items-center justify-center text-gray font-medium text-[14px] text-center py-[15px] px-[16px] !border-[1px] !border-[#22e0bb] shadow-custom rounded-[6px] cursor-not-allowed"
                            disabled
                          >
                            Checked in
                          </button>
                        ) : bookedFlight?.cancelled ? (
                          <button
                            className="h-[42px] flex items-center justify-center text-gray font-medium text-[14px] text-center py-[15px] px-[16px] !border-[1px] !border-[#22e0bb] shadow-custom rounded-[6px] cursor-not-allowed"
                            onClick={onOpenRefundModal}
                          >
                            Cancelled
                          </button>
                        ) : (
                          <div className="flex items-center">
                            {/* Cancel Flight Button */}
                            <button
                              className="cancel-button"
                              onClick={() => {
                                itineraryRef.current = bookedFlight;
                                const itineraryPointer = itineraryRef.current;
                                console.log(
                                  "itineraryPointer",
                                  itineraryPointer
                                );
                                setItinerary(itineraryPointer);
                                onOpenCancelModal();
                              }}
                            >
                              Cancel flight
                            </button>
                            {/* Cancel Flight Button End */}

                            {/* Check in Button */}
                            <button
                              className="checkIn-button"
                              // onClick={onOpenModal}
                              onClick={() => {
                                itineraryRef.current = bookedFlight;
                                const itineraryPointer = itineraryRef.current;
                                console.log(
                                  "itineraryPointer",
                                  itineraryPointer
                                );
                                setItinerary(itineraryPointer);
                                onOpenModal();
                              }}
                            >
                              Check in
                            </button>
                            {/* Check in Button End */}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Itinerary End */}
          </div>
        ))}
      <CancelModal
        openCancelModal={openCancelModal}
        onCloseCancelModal={onCloseCancelModal}
        onCanceled={onCanceled}
        flightToCheckIn={flightToCheckIn}
      />

      <CheckInModal
        open={open}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        onChecked={onChecked}
        flightToCheckIn={flightToCheckIn}
      />
    </div>
  );
};

export default MobileItinerary;
