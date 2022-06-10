import { useState, useRef, useEffect, useMemo, useContext } from "react";
import { ReactComponent as Calendar } from "../../../assets/dashboard-icons/calendar-2.svg";
import { ReactComponent as AirArik } from "../../../assets/dashboard-icons/Airlines.svg";
import { ReactComponent as Aero } from "../../../assets/dashboard-icons/aerologo.svg";
import { ReactComponent as AirIbom } from "../../../assets/dashboard-icons/Airlines-3.svg";
import { ReactComponent as AirPeace } from "../../../assets/dashboard-icons/Airlines-2.svg";
import { ReactComponent as Dana } from "../../../assets/dashboard-icons/danaLogo.svg";
import { ReactComponent as Profile } from "../../../assets/dashboard-icons/profile.svg";
import { ReactComponent as Arrival } from "../../../assets/dashboard-icons/arrival-icon.svg";
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
import { flightContext } from "../../../context/FlightProvider";
import CancelModal from "./CancelModal";
import CheckInModal from "./CheckInModal";

import Button from "../../../component/shared/Button";

import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKED_FLIGHTS } from "../../../hooks";
import { CHECK_IN } from "../../../hooks";
import { CANCEL_BOOKING } from "../../../hooks";

import FlightItinerary from "./FlightItinerary";

const FlightsInfo = ({
  open,
  onCloseModal,
  onChecked,
  checkedIn,
  onCanceled,
  onCloseCancelModal,
  onOpenModal,
  openCancelModal,
  onOpenCancelModal,
  isCanceled,
  onOpenRefundModal,
  isRefunded,
  filter,
}) => {
  const { flight, setFlight } = useContext(flightContext);

  // saves itinerarRef which is passed to BookingDetails component
  const [itinerary, setItinerary] = useState("");
  const itineraryRef = useRef(null);

  // Get Passenger Booked Flights
  const { data: bookedFlights, loading, error } = useQuery(GET_BOOKED_FLIGHTS);
  console.log("UserBooked Flights:", bookedFlights);

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

  // FLIGHT CHECK IN MUTATION
  const [checkIn, { data: checkInResponse, loading: checkingIn }] =
    useMutation(CHECK_IN);

  return (
    <div className="flex sm:flex-row flex-col">
      <div className="flight-container_information">
        <div
          className={`flight-container_information-list ${
            isCanceled && "clicked"
          } ${isRefunded && "unclicked"}`}
        >
          {bookedFlights &&
            bookedFlights?.getBookedFlight?.map((bookedFlight) => (
              <div key={bookedFlight.ticketId} ref={itineraryRef}>
                <div className="header">
                  <p className="flex items-center">
                    Itinerary : &nbsp;&nbsp; {bookedFlight.departureCity}{" "}
                    &nbsp;&nbsp;
                    <Arr /> &nbsp;&nbsp; {bookedFlight.arrivalCity}&nbsp;&nbsp;
                    |&nbsp;&nbsp; Ticketless ID: {bookedFlight.ticketId}
                  </p>

                  <div className="flight-type">
                    <Plane className="mr-[8px]" />
                    {/* Round Trip */}
                    One-way Trip
                  </div>
                </div>
                {/* Flight card */}
                <div key={bookedFlight.ticketId} className="section">
                  <div className="body">
                    <div className="info">
                      <p className="flex items-center">
                        <Departure className="mr-[12px]" />
                        Departure:
                        <span className="mx-[12px]">
                          {bookedFlight.depatureCity}
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
                        {bookedFlight.airlineName === "Ibom Air" && <AirIbom />}
                        {bookedFlight.airlineName === "Arik Air" && <AirArik />}
                        {bookedFlight.airlineName === "Dana Air" && <Dana />}
                        {bookedFlight.airlineName === "Aero" && <Aero />}
                      </div>

                      <div className="arrival-time">
                        <p className="time">{bookedFlight.departureTime}</p>
                        <p className="location">{bookedFlight.departureCity}</p>
                        <p className="airport">
                          Nnamdi Azikiwe International Airport (Nigeria)
                        </p>
                      </div>

                      <div className="hours">
                        <p className="mb-[4px]">1h 30m</p>
                        <Line />
                        <p className="mt-[4px]">0 Stops</p>
                      </div>

                      <div className="departure-time">
                        <p className="time">{bookedFlight.arrivalTime}</p>
                        <p className="location">{bookedFlight.arrivalCity}</p>
                        <p className="airport">
                          Murtala Muhammed International Airport (Nigeria)
                        </p>
                      </div>

                      <div className="">
                        {bookedFlight.class === "ECONOMY" && <EcoClassIcon />}
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
                      <span className="mx-[8px]">
                        {bookedFlight.userFirstName}&nbsp;
                        {bookedFlight.userLastName}
                      </span>
                    </p>
                  </div>

                  {isRefunded ? (
                    <div className="refund-claim">
                      <p>Refund has been claimed for this flight</p>
                    </div>
                  ) : (
                    <div>
                      {checkedIn ? (
                        <div className="flex items-center">
                          {/* C */}
                          <button
                            className="checkIn-button cursor-not-allowed"
                            disabled
                          >
                            Checked in
                          </button>
                        </div>
                      ) : isCanceled ? (
                        <div className="flex items-center">
                          {/* Clam refund Button */}
                          <button
                            className="cancel-button"
                            onClick={onOpenRefundModal}
                          >
                            Claim refund
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
                              const itineraryPointer = itineraryRef.current;
                              console.log("itineraryPointer", itineraryPointer);
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
                              console.log("itineraryPointer", itineraryPointer);
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
            ))}
        </div>
        {/* { bookeFlight } */}

        <FlightItinerary />
      </div>

      {/* Flight History Right side */}
      <div className="flight-container_history">
        <p className="flight-container_history_title">My flights history</p>

        <div className="flight-container_history-container">
          <div className="flight-history_item">
            <div className="flight-history_item-list">
              <p className="flight-history_item-list-places">
                <span className="mr-[12px]">Lagos (LOS)</span>
                <ArrRight />
                <span className="ml-[12px]">Abuja(ABV)</span>
              </p>
              <p className="flight-history_item-list-date">Feb 04, 2022</p>
            </div>
            <ShowIcon className="h-[12.75px] w-[15px]" />
          </div>

          <div className="flight-history_item">
            <div className="flight-history_item-list">
              <p className="flight-history_item-list-places">
                <span className="mr-[12px]">Lagos (LOS)</span>
                <ArrRight />
                <span className="ml-[12px]">Abuja(ABV)</span>
              </p>
              <p className="flight-history_item-list-date">Feb 04, 2022</p>
            </div>
            <ShowIcon className="h-[12.75px] w-[15px]" />
          </div>

          <div className="flight-history_item">
            <div className="flight-history_item-list">
              <p className="flight-history_item-list-places">
                <span className="mr-[12px]">Lagos (LOS)</span>
                <ArrRight />
                <span className="ml-[12px]">Abuja(ABV)</span>
              </p>
              <p className="flight-history_item-list-date">Feb 04, 2022</p>
            </div>
            <ShowIcon className="h-[12.75px] w-[15px]" />
          </div>

          <div className="flight-history_item">
            <div className="flight-history_item-list">
              <p className="flight-history_item-list-places">
                <span className="mr-[12px]">Lagos (LOS)</span>
                <ArrRight />
                <span className="ml-[12px]">Abuja(ABV)</span>
              </p>
              <p className="flight-history_item-list-date">Feb 04, 2022</p>
            </div>
            <ShowIcon className="h-[12.75px] w-[15px]" />
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
    </div>
  );
};
export default FlightsInfo;
