import React,{ useState, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../../../component/Layout";
import { ReactComponent as ArrowLeft } from "../../../assets/dashboard-icons/arrow-left.svg";
import { ReactComponent as Calendar } from "../../../assets/dashboard-icons/calendar-2.svg";
import { ReactComponent as AirArik } from "../../../assets/dashboard-icons/Airlines.svg";
import { ReactComponent as Aero } from "../../../assets/dashboard-icons/aerologo.svg";
import { ReactComponent as AirIbom } from "../../../assets/dashboard-icons/Airlines-3.svg";
import { ReactComponent as AirPeace } from "../../../assets/dashboard-icons/Airlines-2.svg";
import { ReactComponent as Dana } from "../../../assets/dashboard-icons/danaLogo.svg";
import { ReactComponent as Profile } from "../../../assets/dashboard-icons/profile.svg";
import { ReactComponent as Departure } from "../../../assets/dashboard-icons/departure-icon.svg";
import { ReactComponent as Arr } from "../../../assets/dashboard-icons/Arr2.svg";
import { ReactComponent as Plane } from "../../../assets/dashboard-icons/flight-plane.svg";
import { ReactComponent as ArrRight } from "../../../assets/dashboard-icons/ArrRight.svg";
import { ReactComponent as ShowIcon } from "../../../assets/icons/showIcon.svg";
import { ReactComponent as Line } from "../../../assets/dashboard-icons/Line.svg";
import { ReactComponent as BusinessClassIcon } from "../../../assets/flightClass/business.svg";
import { ReactComponent as EcoClassIcon } from "../../../assets/flightClass/economy.svg";
import { ReactComponent as PremiumEcoClassIcon } from "../../../assets/flightClass/premiumEco.svg";
import { ReactComponent as FirstClassIcon } from "../../../assets/flightClass/first.svg";
import CancelModal from "../components/CancelModal";
import CheckInModal from "../components/CheckInModal";

import { useQuery } from "@apollo/client";
import { GET_BOOKED_FLIGHTS, FLIGHT_HISTORY } from "../../../hooks";

const PayedFlights = () => {
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
  const { data: bookedFlights } = useQuery(GET_BOOKED_FLIGHTS);
  console.log("UserBooked Flights:", bookedFlights);

  const { data: flightHistory } = useQuery(FLIGHT_HISTORY);
  console.log("flight History", flightHistory?.bookedFlightHistory);
  console.log("History", flightHistory);

  const flights = bookedFlights?.getBookedFlight?.map((flight) => {
    return {
      flightCode: flight?.flightCode,
    };
  });

  // cycle through the flight array, return a new array if the modal FlightCode === Itinerary flightCode
  let flightToCheckIn = flights?.find(
    (item) => item.flightCode === itinerary?.flightCode
  );
  console.log("flightToCheckIn", flightToCheckIn);

  ref.current = flightToCheckIn;
  console.log("current Ref: ", ref.current);
  return (
    <Layout>
      <div className="bg-bg w-screen pt-[72px] flex flex-col 2xl:items-center min-h-[100vh] py-[32px] pl-[64px]">
        <div className="2xl:w-[1536px] 2xl:flex 2xl:flex-col 2xl:items-center">
          <div className="w-[100%] 2xl:w-[1536px] flex flex-col">
            {/* Back Button */}
            <div className="w-[100%] 2xl:ml-[100px]">
              <Link to="/flights" className="flex items-center w-fit py-[32px]">
                <ArrowLeft />
                <p className="font-serif !font-semibold text-base text-[#5F6B7A] mx-[10px]">
                  Back
                </p>
              </Link>
            </div>
            {/* Back Button End */}
            <div className="flex sm:flex-col lg:flex-row xl:flex-row 2xl:flex-row lg:justify-between xl:justify-between 2xl:justify-evenly pr-[64px]">
              {/* Left side */}
              <div>
                {/* {loading && (
                <div className="flight-container_information">
                  <div className="section h-[200px] bg-white flex justify-center items-center">
                    <div className="body"> GETTING FLIGHTS... </div>
                  </div>
                </div>
              )} */}
                {(!bookedFlights ||
                  bookedFlights?.getBookedFlight.length === 0) && (
                  <div className="flight-container_information">
                    <div className="section h-[200px] bg-white flex justify-center items-center">
                      <div className="body"> NO RECORD FOUND </div>
                    </div>
                  </div>
                )}
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
                              <Arr /> &nbsp;&nbsp; {bookedFlight.arrivalCity}
                              &nbsp;&nbsp; |&nbsp;&nbsp; Ticketless ID:{" "}
                              {bookedFlight.ticketId}
                            </p>

                            <div className="flight-type">
                              <Plane className="mr-[8px]" />
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
                                  <Departure className="mr-[12px]" />
                                  Departure:
                                  <span className="mx-[12px]">
                                    {bookedFlight.departureCity}
                                  </span>
                                  <ArrRight />
                                  <span className="mx-[12px]">
                                    {bookedFlight.arrivalCity}
                                  </span>
                                </p>
                                <div className="flex items-center">
                                  <Calendar className="mr-[12px]" />
                                  <p>{bookedFlight.departureDate}</p>
                                </div>
                              </div>
                              <div className="body-flight_details">
                                <div className="airline-logo">
                                  {bookedFlight.airlineName === "Air Peace" && (
                                    <AirPeace />
                                  )}
                                  {bookedFlight.airlineName === "Ibom Air" && (
                                    <AirIbom />
                                  )}
                                  {bookedFlight.airlineName === "Arik Air" && (
                                    <AirArik />
                                  )}
                                  {bookedFlight.airlineName === "Dana Air" && (
                                    <Dana />
                                  )}
                                  {bookedFlight.airlineName === "Aero" && (
                                    <Aero />
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
                                  <Line />
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
                                  {bookedFlight.class === "PREMIUM_ECONOMY" && (
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
                              <Profile className="mx-[10px]" />
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
                                      className="checkIn-button cursor-not-allowed"
                                      disabled
                                    >
                                      Checked in
                                    </button>
                                  </div>
                                ) : bookedFlight?.cancelled ? (
                                  <div className="flex items-center">
                                    {/* Clam refund Button */}
                                    <button
                                      className="cancel-button cursor-not-allowed"
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
              {/* Right Side */}
              {/* Flight History Right side */}
              <div className="flight-container_history">
                <p className="flight-container_history_title">
                  My flights history
                </p>
                <div className="flight-container_history-container">
                  {flightHistory?.bookedFlightHistory &&
                    flightHistory?.bookedFlightHistory?.map(
                      (flightHistory, index) => (
                        <div className="flight-history_item" key={index}>
                          <div className="flight-history_item-list">
                            <p className="flight-history_item-list-places">
                              <span className="mr-[12px]">
                                {flightHistory?.departureCity}
                                {/* Lagos (LOS) */}
                              </span>
                              <ArrRight />
                              <span className="ml-[12px]">
                                {flightHistory?.arrivalCity}
                                {/* Abuja(ABV) */}
                              </span>
                            </p>
                            <p className="flight-history_item-list-date">
                              {flightHistory?.departureDate}
                              {/* Feb 04, 2022 */}
                            </p>
                          </div>
                          <ShowIcon className="h-[12.75px] w-[15px]" />
                        </div>
                      )
                    )}
                    {/*  */}
                  {(flightHistory?.bookedFlightHistory?.length === 0 ||
                    flightHistory === undefined) && (
                    <div className="flight-history_item !h-[200px] !flex !justify-center !items-center">
                      NO RECORD FOUND
                    </div>
                  )}
                </div>
              </div>
            </div>
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
