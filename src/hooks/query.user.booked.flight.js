import { gql } from "@apollo/client";

export const GET_BOOKED_FLIGHTS = gql`
  query getBookedFlight {
    getBookedFlight {
      ticketId
      airlineId
      airlineName
      flightCode
      departureDate
      departureCity
      departureTime
      departureInfo
      arrivalDate
      arrivalCity
      arrivalTime
      arrivalInfo
      amount
      class
      flightEscrow
      userFirstName
      userLastName
      status
      checkedIn
      cancelled
    }
  }
`;
