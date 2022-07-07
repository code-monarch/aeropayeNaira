import React,{ useState, useRef, useContext } from "react";
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
      <div className="flight-container_information !mr-0">
        <FlightItinerary />
      </div>
    </div>
  );
};
export default FlightsInfo;
