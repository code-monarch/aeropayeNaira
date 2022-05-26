import { useState, useEffect } from "react";
import { ReactComponent as Warning } from "../../../assets/dashboard-icons/Icon_Warning.svg";
import { ReactComponent as AirIbom } from "../../../assets/dashboard-icons/Airlines-3.svg";
import { ReactComponent as AirPeace } from "../../../assets/dashboard-icons/Airlines-2.svg";
import { ReactComponent as Line } from "../../../assets/dashboard-icons/Line.svg";
import { ReactComponent as Arr } from "../../../assets/dashboard-icons/Arr2.svg";
import { ReactComponent as Plane } from "../../../assets/dashboard-icons/flight-plane.svg";
import { ReactComponent as Calendar } from "../../../assets/dashboard-icons/calendar-2.svg";
import { ReactComponent as AirArik } from "../../../assets/dashboard-icons/Airlines.svg";
import { ReactComponent as Profile } from "../../../assets/dashboard-icons/profile.svg";
import { ReactComponent as Arrival } from "../../../assets/dashboard-icons/arrival-icon.svg";
import { ReactComponent as Departure } from "../../../assets/dashboard-icons/departure-icon.svg";
import { ReactComponent as ArrRight } from "../../../assets/dashboard-icons/ArrRight.svg";
import { ReactComponent as ShowIcon } from "../../../assets/icons/showIcon.svg";

import { GET_AVAILABLE_FLIGHTS } from "../../../hooks";
import { GET_ALL_PASSENGERS } from "../../../hooks";
import { useQuery, useLazyQuery } from "@apollo/client";

import BookingSummaryModal from "./BookingSummaryModal";

import { Link } from "react-router-dom";

const FlightItinerary = () => {
//     useEffect(() => {
//   fetchData();
// }, []);
  const { loading, error, data } = useQuery(GET_AVAILABLE_FLIGHTS);
    
// const [fetchData, { data, refetch, loading }] = useLazyQuery(GET_ALL_PASSENGERS);
    
//   const {loading, error, data } = useQuery(GET_ALL_PASSENGERS);
  if (loading) {
    console.log(loading, "loading");
  }
    if (error) {
      console.log(error, "error")
  }
  console.log(data, "available flights");

  const [openBookingSummary, setOpenBookingSummary] = useState(false);

  // Open Button and Close Button
  const onOpenBookingModal = () => setOpenBookingSummary(true);
  const onCloseBookingModal = () => setOpenBookingSummary(false);
  return (
    <div>
      {data?.getAvailableFlights?.map((flight) => (
      <div className="flight-container_information-list">
        <div className="warning">
          <Warning />
          <p>
            The availability of this flight will expire in <b>23:30:12</b> if
            payment is not being made.
          </p>
        </div>
        <div className="header">
          <p className="flex items-center">
            Itinerary : &nbsp;&nbsp; {flight.departureCity} &nbsp;&nbsp;
                      <Arr /> &nbsp;&nbsp; { flight.arrivalCity}&nbsp;&nbsp; |&nbsp;&nbsp; Ticketless
            ID: XXXXXXX
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
                              <span className="mx-[12px]">{ flight.departureCity }</span>
                <ArrRight />
                              <span className="mx-[12px]">{ flight.arrivalCity }</span>
              </p>
              <div className="flex items-center">
                <Calendar className="mr-[12px]" />
                              <p>{ flight.departureDate }</p>
              </div>
            </div>
            <div className="body-flight_details">
              <div className="airline-logo">
                <AirPeace />
              </div>

              <div className="departure-time">
                              <p className="time">{ flight.departureTime }</p>
                              <p className="location">{ flight.departureCity }</p>
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
                              <p className="time">{ flight.arrivalTime }</p>
                              <p className="location">{ flight.arrivalCity }</p>
                <p className="airport">Kotoka, T3, Accra (Ghana)</p>
              </div>

                          <div className="flight-cabin-business">{ flight.class }</div>
            </div>
          </div>
        </div>
        <div className="flight-checkout">
          <div className="flex items-center">
            <Profile className="mx-[10px]" />
            <p>
              Passengers:
              <span className="mx-[8px]">Derek Hale</span>
            </p>
          </div>

          {/* Make Payment */}
          {/* Show Flight booking summary when Make Payment is clicked */}
          <div className="flex items-center">
            <Link to="/flights/book-flight" className="cancel-button">
              Change flight
            </Link>
            <button onClick={onOpenBookingModal} className="checkIn-button">
              Make payment
            </button>
          </div>
          {/* Make Payment End */}
        </div>
          </div>
      ))}
      <div className="flight-container_information-list">
        <div className="warning">
          <Warning />
          <p>
            The availability of this flight will expire in <b>09:45:54</b> if
            payment is not being made.
          </p>
        </div>
        <div className="header">
          <p className="flex items-center">
            Itinerary : &nbsp;&nbsp; Port-Harcourt (PHC) &nbsp;&nbsp;
            <Arr />
            &nbsp;&nbsp; Lagos (LOS)&nbsp;&nbsp; |&nbsp;&nbsp; Ticketless ID:
            XXXXXXX
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
                <span className="mx-[12px]">Port-Harcourt (PHC)</span>
                <ArrRight />
                <span className="mx-[12px]">Lagos (LOS)</span>
              </p>
              <div className="flex items-center">
                <Calendar className="mr-[12px]" />
                <p>Mar 10, 2022</p>
              </div>
            </div>
            <div className="body-flight_details">
              <div className="airline-logo">
                <AirIbom />
              </div>

              <div className="departure-time">
                <p className="time">9:00 AM</p>
                <p className="location">Port-Harcourt</p>
                <p className="airport">
                  Port-Harcourt International Airport (Nigeria)
                </p>
              </div>

              <div className="hours">
                <p className="mb-[4px]">0h 45m</p>
                <Line />
                <p className="mt-[4px]">0 Stops</p>
              </div>

              <div className="arrival-time">
                <p className="time">9:45 AM</p>
                <p className="location">Lagos</p>
                <p className="airport">
                  Murtala Muhammed International Airport (Nigeria)
                </p>
              </div>

              <div className="flight-cabin-premium-eco">premium eco.</div>
            </div>
          </div>
        </div>
        <div className="flight-checkout">
          <div className="flex items-center">
            <Profile className="mx-[10px]" />
            <p>
              Passengers:
              <span className="mx-[8px]">Derek Hale</span>
            </p>
          </div>

          <div className="flex items-center">
            <Link to="/flights/book-flight" className="cancel-button">
              Change flight
            </Link>
            <button className="checkIn-button">Make payment</button>
          </div>
        </div>
      </div>
      <BookingSummaryModal
        openBookingSummary={openBookingSummary}
        onCloseBookingModal={onCloseBookingModal}
      />
    </div>
  );
};

export default FlightItinerary;
