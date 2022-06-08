import { gql } from "@apollo/client";

export const GET_BOOKED_FLIGHTS = gql`
  query getBookedFlight {
    getBookedFlight {
      ticketId
      airlineId
      airlineName
      flightCode
      departureDate
      departureTime
      departureInfo
      arrivalDate
      arrivalTime
      arrivalInfo
      amount
      status
      createdAt
      updatedAt
    }
  }
`;
