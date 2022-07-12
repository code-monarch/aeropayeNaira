import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import FlightHistory from "../components/FlightHistory";
import Layout from "../../../component/Layout";
import {
  Skeleton,
  AeroLogo,
  AirArikLogo,
  AirIbomLogo,
  AirPeaceLogo,
  DanaLogo,
  LineIcon,
  ProfileIcon,
  ArrIcon,
  ArrowLeftIcon,
  PlaneIcon,
  CalendarIcon,
  DepartureIcon,
  ArrRightIcon,
  BusinessClassIcon,
  EcoClassIcon,
  PremiumEcoClassIcon,
  FirstClassIcon,
} from "../components";
import CancelModal from "../components/CancelModal";
import CheckInModal from "../components/CheckInModal";
import MobileItinerary from "../components/MobileItinerary";

import { useQuery } from "@apollo/client";
import { GET_BOOKED_FLIGHTS } from "../../../hooks";

const PayedFlights = () => {
  // Show mobile view for screens smaller than 768px or resized to that size
  const [mobileView, setMobileView] = useState(
    window.matchMedia("(max-width:900px)").matches
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      setMobileView(window.matchMedia("(max-width:900px)").matches);
    });
  });
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

  // saves itinerarRef which is passed to BookingDetails component
  const [itinerary, setItinerary] = useState("");
  const itineraryRef = useRef(null);
  const ref = useRef(null);

  // Get Passenger Booked Flights
  const { data: bookedFlights, loading: loadingBookedFlights } =
    useQuery(GET_BOOKED_FLIGHTS);
  console.log("UserBooked Flights:", bookedFlights);

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
  return (
    <Layout>
      <div className="bg-bg min-h-screen w-screen pt-0 lg:pt-[72px] py-[32px] px-[15px] lg:pl-[64px] flex flex-col items-center lg:items-start 2xl:items-center">
        <div className="2xl:w-[1536px] 2xl:flex 2xl:flex-col 2xl:items-center">
          <div className="w-[100%] 2xl:w-[1536px] flex flex-col">
            {/* Back Button */}
            <div className="w-[100%] 2xl:ml-[100px]">
              <Link to="/flights" className="flex items-center w-fit py-[32px]">
                <ArrowLeftIcon />
                <p className="!font-serif !font-semibold text-base text-[#5F6B7A] mx-[10px]">
                  Back
                </p>
              </Link>
            </div>
            {/* Back Button End */}
            {mobileView ? (
              <div>
                <MobileItinerary />
                <FlightHistory />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-col xl:flex-row 2xl:flex-row lg:justify-between xl:justify-between 2xl:justify-evenly pr-[64px]">
                {/* Left side */}
                <div>
                  {!loadingBookedFlights &&
                    (!bookedFlights ||
                      bookedFlights?.getBookedFlight.length === 0) && (
                      <div className="flight-container_information">
                        <div className="section h-[200px] flex justify-center !flex-col items-center">
                          <div className="body !text-[20px] font-sans !font-bold">
                            {" "}
                            No FLIGHTS FOUND{" "}
                          </div>
                          <div className="body font-sans">
                            {" "}
                            You haven't paid for any flight.{" "}
                          </div>
                        </div>
                      </div>
                    )}
                  {loadingBookedFlights && !mobileView && (
                    <div className="mr-[32px]">
                      <Skeleton />
                    </div>
                  )}
                  {/* {loading && !mobileView && <Skeleton />} */}
                  {bookedFlights &&
                    bookedFlights?.getBookedFlight?.map((bookedFlight) => (
                      <div
                        key={bookedFlight.ticketId}
                        ref={ref}
                        className="flight-container_information"
                      >
                        <div
                          className={`flight-container_information-list ${
                            isCanceled && "clicked"
                          } ${isRefunded && "unclicked"}`}
                        >
                          <div className="mb-[32px]">
                            {/* Header */}
                            <div className="header">
                              <p className="flex items-center">
                                Itinerary : &nbsp;&nbsp;{" "}
                                {bookedFlight.departureCity} &nbsp;&nbsp;
                                <ArrIcon /> &nbsp;&nbsp;{" "}
                                {bookedFlight.arrivalCity}
                                &nbsp;&nbsp; |&nbsp;&nbsp; Ticketless ID:{" "}
                                {bookedFlight.ticketId}
                              </p>

                              <div className="flight-type">
                                <div className="mr-[8px]">
                                  <PlaneIcon />
                                </div>
                                {/* Round Trip */}
                                One-way Trip
                              </div>
                            </div>
                            {/* Header End */}
                            {/* Flight card */}
                            <div className="section">
                              <div className="body">
                                <div className="info">
                                  <p className="flex items-center">
                                    <div className="mr-[12px]">
                                      <DepartureIcon />
                                    </div>
                                    Departure:
                                    <span className="mx-[12px]">
                                      {bookedFlight.departureCity}
                                    </span>
                                    <ArrRightIcon />
                                    <span className="mx-[12px]">
                                      {bookedFlight.arrivalCity}
                                    </span>
                                  </p>
                                  <div className="flex items-center">
                                    <div className="mr-[12px]">
                                      <CalendarIcon />
                                    </div>
                                    <p>{bookedFlight.departureDate}</p>
                                  </div>
                                </div>
                                <div className="body-flight_details">
                                  <div className="airline-logo">
                                    {bookedFlight.airlineName ===
                                      "Air Peace" && <AirPeaceLogo />}
                                    {bookedFlight.airlineName ===
                                      "Ibom Air" && <AirIbomLogo />}
                                    {bookedFlight.airlineName ===
                                      "Arik Air" && <AirArikLogo />}
                                    {bookedFlight.airlineName ===
                                      "Dana Air" && <DanaLogo />}
                                    {bookedFlight.airlineName === "Aero" && (
                                      <AeroLogo />
                                    )}
                                  </div>

                                  <div className="arrival-time">
                                    <p className="time">
                                      {bookedFlight.departureTime}
                                    </p>
                                    <p className="location">
                                      {bookedFlight.departureCity}
                                    </p>
                                    <p className="airport">
                                      Nnamdi Azikiwe International Airport
                                      (Nigeria)
                                    </p>
                                  </div>

                                  <div className="hours">
                                    <p className="mb-[4px]">1h 30m</p>
                                    <LineIcon />
                                    <p className="mt-[4px]">0 Stops</p>
                                  </div>

                                  <div className="departure-time">
                                    <p className="time">
                                      {bookedFlight.arrivalTime}
                                    </p>
                                    <p className="location">
                                      {bookedFlight.arrivalCity}
                                    </p>
                                    <p className="airport">
                                      Murtala Muhammed International Airport
                                      (Nigeria)
                                    </p>
                                  </div>

                                  <div className="">
                                    {bookedFlight.class === "ECONOMY" && (
                                      <EcoClassIcon />
                                    )}
                                    {bookedFlight.class === "FIRST_CLASS" && (
                                      <FirstClassIcon />
                                    )}
                                    {bookedFlight.class === "BUSINESS" && (
                                      <BusinessClassIcon />
                                    )}
                                    {bookedFlight.class ===
                                      "PREMIUM_ECONOMY" && (
                                      <PremiumEcoClassIcon />
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* Departure card End */}
                              {/* Arrival Card */}
                              {/* <div className="body">
              <div className="info">
                <p className="flex items-center">
                  <Arrival className="mr-[12px]" />
                  Return:
                  <span className="mx-[12px]">Abuja(ABV)</span>
                  <ArrRight />
                  <span className="mx-[12px]">Lagos (LOS)</span>
                </p>
                <div className="flex items-center">
                  <Calendar className="mr-[12px]" />
                  <p>Feb 21, 2022</p>
                </div>
              </div>
              <div className="body-flight_details">
                <div className="airline-logo">
                  <AirArik />
                </div>

                <div className="departure-time">
                  <p className="time">11:30 AM</p>
                  <p className="location">Lagos</p>
                  <p className="airport">
                    Murtala Muhammed International Airport (Nigeria)
                  </p>
                </div>

                <div className="hours">
                  <p className="mb-[4px]">1h 30m</p>
                  <Line />
                  <p className="mt-[4px]">0 Stops</p>
                </div>

                <div className="arrival-time">
                  <p className="time">1:00 PM</p>
                  <p className="location">Abuja</p>
                  <p className="airport">
                    Nnamdi Azikiwe International Airport (Nigeria)
                  </p>
                </div>

                <div className="flight-cabin-economy">Economy</div>
              </div>
            </div> */}
                              {/* Arrival card End */}
                            </div>
                            <div className="flight-checkout">
                              <div className="flex items-center">
                                <ProfileIcon className="mx-[10px]" />
                                <p>
                                  Passengers:
                                  <span className="mx-[8px]">
                                    {bookedFlight.userFirstName}&nbsp;
                                    {bookedFlight.userLastName},
                                  </span>
                                  {/* <span className="mx-[8px]">
                                  {bookedFlight.userFirstName}&nbsp;
                                  {bookedFlight.userLastName}
                                </span> */}
                                </p>
                              </div>

                              {isRefunded ? (
                                <div className="refund-claim">
                                  <p>Refund has been claimed for this flight</p>
                                </div>
                              ) : (
                                <div>
                                  {bookedFlight?.checkedIn ? (
                                    <div className="flex items-center">
                                      {/* C */}
                                      <button
                                        className="cancel-button cursor-not-allowed !text-gray"
                                        disabled
                                      >
                                        Checked in
                                      </button>
                                    </div>
                                  ) : bookedFlight?.cancelled ? (
                                    <div className="flex items-center">
                                      {/* Clam refund Button */}
                                      <button
                                        className="cancel-button cursor-not-allowed !text-gray"
                                        onClick={onOpenRefundModal}
                                      >
                                        Cancelled
                                      </button>
                                      {/* Claim refund Button End */}
                                    </div>
                                  ) : (
                                    <div className="flex items-center">
                                      {/* Cancel Flight Button */}
                                      <button
                                        className="cancel-button"
                                        onClick={() => {
                                          itineraryRef.current = bookedFlight;
                                          const itineraryPointer =
                                            itineraryRef.current;
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
                                          const itineraryPointer =
                                            itineraryRef.current;
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
                    ))}
                </div>
                {/* Right Side End*/}
                {/* Flight History Right side */}
                <FlightHistory />
              </div>
            )}
          </div>
        </div>
      </div>
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
    </Layout>
  );
};

export default PayedFlights;
