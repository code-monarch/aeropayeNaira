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
    <div className="flex sm:flex-col flex-row lg-flex-row xl-flex-row">
      <div className="flight-container_information">
        <FlightItinerary />
      </div>
    </div>
  );
};
export default FlightsInfo;
