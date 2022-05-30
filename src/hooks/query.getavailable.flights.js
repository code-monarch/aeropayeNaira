import { gql } from "@apollo/client";

export const GET_AVAILABLE_FLIGHTS = gql`
  query {
    getAvailableFlights {
      airlineName
      flightCode
      departureCity
      departureDate
      departureTime
      departureInfo
      arrivalCity
      arrivalDate
      arrivalTime
      arrivalInfo
      airfare
      flightEscrow
      class
    }
  }
`;