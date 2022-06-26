import { useState, useRef } from "react";
import { ReactComponent as Warning } from "../../../assets/dashboard-icons/Icon_Warning.svg";
import { ReactComponent as Aero } from "../../../assets/dashboard-icons/aerologo.svg";
import { ReactComponent as AirArik } from "../../../assets/dashboard-icons/Airlines.svg";
import { ReactComponent as AirIbom } from "../../../assets/dashboard-icons/Airlines-3.svg";
import { ReactComponent as AirPeace } from "../../../assets/dashboard-icons/Airlines-2.svg";
import { ReactComponent as Dana } from "../../../assets/dashboard-icons/danaLogo.svg";
import { ReactComponent as Line } from "../../../assets/dashboard-icons/Line.svg";
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

// import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";

import dateFormat from "dateformat";

import { GET_AVAILABLE_FLIGHTS } from "../../../hooks";
// import { GET_ALL_PASSENGERS } from "../../../hooks";
import { useQuery, useLazyQuery } from "@apollo/client";

import BookingSummaryModal from "./BookingSummaryModal";
import BookingSuccessModal from "./BookingSuccessModal";
import BookingFailedModal from "./BookingFailedModal";

const FlightItinerary = () => {
  // saves itinerarRef which is passed to BookingDetails component
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
          <div className="flight-container_information-list">
            <div className="warning">
              <Warning />
              <p>
                The availability of this flight will expire in <b>23:30:12 </b>
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
                    <p>{dateFormat(flight?.departureDate, "mmmm dS, yyyy")}</p>
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
                    <p className="airport">Kotoka, T3, Accra (Ghana)</p>
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
                    itineraryRef.current = flight;
                    const itineraryPointer = itineraryRef.current;
                    setItinerary(itineraryPointer);
                    openBookingModal();
                  }}
                  className="checkIn-button"
                >
                  Make payment
                </button>
              </div>
              {/* Make Payment End */}
            </div>
          </div>
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
