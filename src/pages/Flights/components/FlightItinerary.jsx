import { useState, useRef, useEffect } from "react";
import { ReactComponent as Warning } from "../../../assets/dashboard-icons/Icon_Warning.svg";
import { ReactComponent as Aero } from "../../../assets/dashboard-icons/aerologo.svg";
import { ReactComponent as AirArik } from "../../../assets/dashboard-icons/Airlines.svg";
import { ReactComponent as AirIbom } from "../../../assets/dashboard-icons/Airlines-3.svg";
import { ReactComponent as AirPeace } from "../../../assets/dashboard-icons/Airlines-2.svg";
import { ReactComponent as Dana } from "../../../assets/dashboard-icons/danaLogo.svg";
import { ReactComponent as Line } from "../../../assets/dashboard-icons/Line.svg";
import { ReactComponent as MobileLine } from "../../../assets/dashboard-icons/mobile-line.svg";
import { ReactComponent as Arr } from "../../../assets/dashboard-icons/Arr2.svg";
import { ReactComponent as Plane } from "../../../assets/dashboard-icons/flight-plane.svg";
import { ReactComponent as Calendar } from "../../../assets/dashboard-icons/calendar-2.svg";
import { ReactComponent as Profile } from "../../../assets/dashboard-icons/profile.svg";
import { ReactComponent as Arrival } from "../../../assets/dashboard-icons/arrival-icon.svg";
import { ReactComponent as ShowIcon } from "../../../assets/icons/showIcon.svg";
import { ReactComponent as Departure } from "../../../assets/dashboard-icons/departure-icon.svg";
import { ReactComponent as ArrRight } from "../../../assets/dashboard-icons/ArrRight.svg";
import { ReactComponent as BusinessClassIcon } from "../../../assets/flightClass/business.svg";
import { ReactComponent as EcoClassIcon } from "../../../assets/flightClass/economy.svg";
import { ReactComponent as PremiumEcoClassIcon } from "../../../assets/flightClass/premiumEco.svg";
import { ReactComponent as FirstClassIcon } from "../../../assets/flightClass/first.svg";
import { toastError } from "../../../component/shared/Toasts";
import { useVerifEmailStatus } from "../../../utils/EmailVerifStatus";

// import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";

import dateFormat from "dateformat";

import { GET_AVAILABLE_FLIGHTS } from "../../../hooks";
// import { GET_ALL_PASSENGERS } from "../../../hooks";
import { useQuery } from "@apollo/client";

import BookingSummaryModal from "./BookingSummaryModal";
import BookingSuccessModal from "./BookingSuccessModal";
import BookingFailedModal from "./BookingFailedModal";

const FlightItinerary = () => {
  // saves itinerarRef which is passed to BookingDetails component
  const isVerified = useVerifEmailStatus();
  const [itinerary, setItinerary] = useState("");
  const itineraryRef = useRef(null);

  const [showBookingSummary, setShowBookingSummary] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [showBookingFailed, setShowBookingFailed] = useState(false);

  const openBookingModal = () => {
    setShowBookingSummary(true);
  };
  const closeBookingModal = () => setShowBookingSummary(false);

  const openBookingSuccess = () => {
    setShowBookingSuccess(true);
    closeBookingModal();
  };
  const closeBookingSuccess = () => setShowBookingSuccess(false);

  const openBookingFailed = () => {
    setShowBookingFailed(true);
    closeBookingSuccess();
  };
  const closeBookingFailed = () => setShowBookingFailed(false);

  // Show mobile view for screens smaller than 768px or resized to that size
  const [mobileView, setMobileView] = useState(
    window.matchMedia("(max-width:768px)").matches
  );
  // Show mobile view for screens smaller than 360px or resized to that size
  const [smallMobile, setSmallMobile] = useState(
    window.matchMedia("(max-width:360px)").matches
  );

  const { loading, error, data } = useQuery(GET_AVAILABLE_FLIGHTS);
  console.log("getAvailable flights data", data?.getAvailableFlights);

  // get flightcode
  const flightCode = data?.getAvailableFlights?.map((flight) => {
    return flight?.flightCode;
  });

  if (loading) {
    console.log(loading, "loading");
  }
  if (error) {
    console.log(error, "error");
  }
  console.log(data, "available flights");

  useEffect(() => {
    window.addEventListener("resize", () => {
      setMobileView(window.matchMedia("(max-width:768px)").matches);
    });
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSmallMobile(window.matchMedia("(max-width:360px)").matches);
    });
  });

  return (
    <div>
      {(!data || data?.getAvailableFlights.length === 0) && (
        <div className="flight-container_information">
          <div className="section h-[200px] bg-white flex justify-center items-center">
            <div className="body"> NO RECORDS FOUND </div>
          </div>
        </div>
      )}
      {data?.getAvailableFlights?.map((flight) => (
        <div key={flight?.flightCode} ref={itineraryRef}>
          {/* Display Mobile view itinerary */}
          {mobileView ? (
            <div className="!w-full flex flex-col">
              {/* Warning */}
              <div className="!w-full bg-[#fff6ed] flex items-center py-[9px] px-[13px] mb-[16px] border-[1px] border-[#fce3b9] rounded-[4px]">
                <Warning className={`${mobileView && "w-[40px]"}`} />
                <p className="font-serif font-[400] text-[10px] sm:text-[12px] md:text-[14px] text-black ml-[10px]">
                  The availability of this flight will expire in{" "}
                  <b>23:30:12 </b>
                  if payment is not being made.
                </p>
              </div>
              {/* Itinerary */}
              <div className="flex flex-col items-center w-full rounded-[8px] mb-[32px] shadow-custom">
                {/* Header */}
                <div className="bg-black w-full font-sans text-[14px] text-white font-[500] px-[16px] py-[8px] flex flex-col rounded-t-[8px]">
                  {/* Top */}
                  <div className="flex items-center mb-[16px]">
                    <p className="text-[12px] sm:text-[14px] md:text-[16px]">
                      Itinerary :
                    </p>
                    <div className="flex items-center text-[12px] sm:text-[14px]">
                      &nbsp;&nbsp; {flight.departureCity} &nbsp;&nbsp;
                      <Arr className="w-[15px] h-[13px] sm:w-[16px] sm:h-[15px] md:w-[19px] md:h-[17px]" />{" "}
                      &nbsp;&nbsp; {flight.arrivalCity}&nbsp;&nbsp;
                    </div>
                  </div>
                  {/* Bottom */}
                  <div className="flex justify-between items-center">
                    <p className="text-[12px] sm:text-[14px] md:text-[16px]">
                      Ticketless ID: XXXXXXX
                    </p>
                    <div className="bg-[#515964] text-[12px] flex justify-center items-center h-[28px] py-[7px] px-[12px] rounded-[4px] whitespace-nowrap">
                      <Plane className="mr-[8px] w-[15px] h-[13px]" />
                      One-way
                    </div>
                  </div>
                </div>
                {/* Body */}
                <div className="w-full flex flex-col items-center">
                  {/* Departure and Arrival Info */}
                  <div className="bg-[#EDFFF9] w-full flex flex-col text-black px-[18px] py-[11px]">
                    <p className="flex items-center text-[12px] sm-text-[14px] md:text-[16px] mb-[16px]">
                      <Departure className="mr-[12px] w-[15px] h-[13px]" />
                      Departure:
                      <span className="mx-[12px] text-[12px] sm:text-[14px]">
                        {flight?.departureCity}
                      </span>
                      <ArrRight className="w-[15px] h-[13px] sm:w-[17px] sm:h-[15px] md:w-[19px] md:h-[17px]" />
                      <span className="mx-[12px] text-[12px] sm:text-[14px]">
                        {flight?.arrivalCity}
                      </span>
                    </p>
                    <div className="flex items-center">
                      <Calendar className="w-[15px] h-[13px] sm:w-[17px] sm:h-[15px] md:w-[19px] md:h-[17px] mr-[12px]" />
                      <p className="text-[12px] sm:text-[14px]">
                        {dateFormat(flight?.departureDate, "mmmm dS, yyyy")}
                      </p>
                    </div>
                  </div>
                  {/* Flight details */}
                  <div className="bg-white w-full flex flex-row justify-between px-[17px] py-[22px]">
                    {/* Left side */}
                    <div className="flex flex-col justify-between">
                      <p className="font-sans font-[500] text-[18px]">
                        {flight?.departureTime}
                      </p>
                      <p className="font-sans font-[500] text-[18px]">
                        {flight?.arrivalTime}
                      </p>
                    </div>
                    {/* Left Side End */}
                    {/* Middle Side */}
                    <div className="flex items-center ml-[-16px] mr-[24px]">
                      <p className="mr-[24px] text-[10px] text-[#8895A7] whitespace-nowrap">
                        1h 30m <br />0 Stops
                      </p>
                      <MobileLine className="h-full" />
                    </div>
                    {/* Middle Side end */}
                    {/* Right Side */}
                    <div className="flex flex-col justify-between">
                      {/* Departure City */}
                      <div>
                        <p className="text-[14px] mb-[4px]">
                          {flight?.departureCity}
                        </p>
                        <p className="text-[10px] text-[#8895A7]">
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
                          {flight?.airlineName === "Air Peace" && <AirPeace />}
                          {flight?.airlineName === "Ibom Air" && <AirIbom />}
                          {flight?.airlineName === "Arik Air" && <AirArik />}
                          {flight?.airlineName === "Dana Air" && <Dana />}
                          {flight?.airlineName === "Aero" && <Aero />}
                        </div>
                        <div
                          className={`${
                            smallMobile ? "w-[55px] mt-[10px]" : "w-[67px]"
                          }`}
                        >
                          {flight?.class === "ECONOMY" && <EcoClassIcon />}
                          {flight?.class === "FIRST_CLASS" && (
                            <FirstClassIcon />
                          )}
                          {flight?.class === "BUSINESS" && (
                            <BusinessClassIcon />
                          )}
                          {flight?.class === "PREMIUM_ECONOMY" && (
                            <PremiumEcoClassIcon />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-[14px] mb-[4px]">
                          {flight?.arrivalCity}
                        </p>
                        <p className="text-[10px] text-[#8895A7]">
                          Nnamdi Azikwe Airport (Nigeria)
                        </p>
                      </div>
                    </div>
                    {/* Right Side End */}
                  </div>
                  {/* Flight details End */}
                  {/* Passenger Details */}
                  <div className="w-full flex flex-col p-[20px]">
                    <div className="flex items-center mb-[28px]">
                      <Profile className="w-[25px] h-[20px] mr-[5px]" />
                      <p className="text-[12px]">
                        Passengers:
                        <span className="mx-[8px]">Derek Hale</span>
                      </p>
                    </div>
                    {/* Make payment and change flight buttons */}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          if (isVerified) {
                            itineraryRef.current = flight;
                            const itineraryPointer = itineraryRef.current;
                            setItinerary(itineraryPointer);
                            openBookingModal();
                          } else {
                            toastError("Verify your Email to book flights");
                          }
                        }}
                        className="bg-green h-[42px] text-black text-[14px] font-sans font-[500] py-[15px] mr-[16px] px-[16px] flex justify-center items-center shadow-custom rounded-[6px] whitespace-nowrap"
                      >
                        Make payment
                      </button>
                      <Link
                        to="/flights/book-flight"
                        className="h-[42px] text-black text-[14px] font-sans font-[500] flex justify-center items-center py-[15px] px-[16px] border-[1px] border-green rounded-[6px] shadow-custom whitespace-nowrap"
                      >
                        Change flight
                      </Link>
                    </div>
                    {/* Make payment and change flight buttons end */}
                  </div>
                </div>
              </div>
              {/* Itinerary End */}
            </div>
          ) : (
            <div className="flight-container_information-list">
              <div className="warning">
                <Warning />
                <p>
                  The availability of this flight will expire in{" "}
                  <b>23:30:12 </b>
                  if payment is not being made.
                </p>
              </div>
              <div className="header">
                <p className="flex items-center">
                  Itinerary : &nbsp;&nbsp; {flight.departureCity} &nbsp;&nbsp;
                  <Arr /> &nbsp;&nbsp; {flight.arrivalCity}&nbsp;&nbsp;
                  |&nbsp;&nbsp; Ticketless ID: XXXXXXX
                </p>

                <div className="flight-type">
                  <Plane className="mr-[8px]" />
                  One-way Trip
                </div>
              </div>
              <div className="section">
                <div className="body">
                  <div className="info">
                    <p className="flex items-center">
                      <Departure className="mr-[12px]" />
                      Departure:
                      <span className="mx-[12px]">{flight?.departureCity}</span>
                      <ArrRight />
                      <span className="mx-[12px]">{flight?.arrivalCity}</span>
                    </p>
                    <div className="flex items-center">
                      <Calendar className="mr-[12px]" />
                      <p>
                        {dateFormat(flight?.departureDate, "mmmm dS, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="body-flight_details">
                    <div className="airline-logo">
                      {flight?.airlineName === "Air Peace" && <AirPeace />}
                      {flight?.airlineName === "Ibom Air" && <AirIbom />}
                      {flight?.airlineName === "Arik Air" && <AirArik />}
                      {flight?.airlineName === "Dana Air" && <Dana />}
                      {flight?.airlineName === "Aero" && <Aero />}
                    </div>

                    <div className="departure-time">
                      <p className="time">{flight?.departureTime}</p>
                      <p className="location">{flight?.departureCity}</p>
                      <p className="airport">
                        Murtala Muhammed International Airport (Nigeria)
                      </p>
                    </div>

                    <div className="hours">
                      <p className="mb-[4px]">1h 45m</p>
                      <Line />
                      <p className="mt-[4px]">0 Stops</p>
                    </div>

                    <div className="arrival-time">
                      <p className="time">{flight?.arrivalTime}</p>
                      <p className="location">{flight?.arrivalCity}</p>
                      <p className="airport">Nnamdi Azikwe Airport (Nigeria)</p>
                    </div>

                    <div>
                      {flight?.class === "ECONOMY" && <EcoClassIcon />}
                      {flight?.class === "FIRST_CLASS" && <FirstClassIcon />}
                      {flight?.class === "BUSINESS" && <BusinessClassIcon />}
                      {flight?.class === "PREMIUM_ECONOMY" && (
                        <PremiumEcoClassIcon />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flight-checkout !justify-end">
                {/* <div className="flex items-center">
                <Profile className="mx-[10px]" />
                <p>
                  Passengers:
                  <span className="mx-[8px]">Derek Hale</span>
                </p>
              </div> */}

                {/* Make Payment */}
                {/* Show Flight booking summary when Make Payment is clicked */}
                <div className="flex items-center">
                  <Link to="/flights/book-flight" className="cancel-button">
                    Change flight
                  </Link>
                  <button
                    onClick={() => {
                      if (isVerified) {
                        itineraryRef.current = flight;
                        const itineraryPointer = itineraryRef.current;
                        setItinerary(itineraryPointer);
                        openBookingModal();
                      } else {
                        toastError("Verify your Email to book flights");
                      }
                    }}
                    className="checkIn-button"
                  >
                    Make payment
                  </button>
                </div>
                {/* Make Payment End */}
              </div>
            </div>
          )}
        </div>
      ))}
      <BookingSummaryModal
        showBookingSummary={showBookingSummary}
        openBookingModal={openBookingModal}
        closeBookingModal={closeBookingModal}
        showBookingFailed={showBookingFailed}
        showBookingSuccess={showBookingSuccess}
        itinerary={itinerary}
        code={flightCode}
      />
      <BookingSuccessModal
        showBookingSuccess={showBookingSuccess}
        openBookingSuccess={openBookingSuccess}
        closeBookingSuccess={closeBookingSuccess}
        onShowBookingFailed={openBookingFailed}
      />
      <BookingFailedModal
        showBookingFailed={showBookingFailed}
        openBookingFailed={openBookingFailed}
        closeBookingFailed={closeBookingFailed}
      />
    </div>
  );
};

export default FlightItinerary;
