import React from 'react'
import {
  FlightHistorySkeleton,
  ShowIcon,
  ArrRightIcon,
} from "../components";
import { useQuery } from "@apollo/client";
import { FLIGHT_HISTORY } from "../../../hooks";

const FlightHistory = () => {
  // Get Passenger Flight history
  const { data: flightHistory, loading: loadingFlightHistory } =
    useQuery(FLIGHT_HISTORY);
  console.log("flight History", flightHistory?.bookedFlightHistory);
  console.log("History", flightHistory);
  return (
    <div className="flight-container_history">
      <p className="flight-container_history_title">My flights history</p>
      <div className="flight-container_history-container">
        {loadingFlightHistory && <FlightHistorySkeleton />}
        {flightHistory?.bookedFlightHistory &&
          flightHistory?.bookedFlightHistory?.map((flightHistory, index) => (
            <div className="flight-history_item" key={index}>
              <div className="flight-history_item-list">
                <p className="flight-history_item-list-places">
                  <span className="mr-[12px]">
                    {flightHistory?.departureCity}
                    {/* Lagos (LOS) */}
                  </span>
                  <ArrRightIcon />
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
              <ShowIcon />
            </div>
          ))}

        {/* W */}
        {(flightHistory?.bookedFlightHistory?.length === 0 ||
          flightHistory === undefined) &&
          !loadingFlightHistory && (
            <div className="flight-history_item !h-[200px] !flex !justify-center !items-center !text-[16px] !font-semibold">
              No record found
            </div>
          )}
      </div>
    </div>
  );
}

export default FlightHistory