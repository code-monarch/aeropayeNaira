import { gql } from "@apollo/client";

export const GET_AVAILABLE_FLIGHTS = gql`
  query getAvailableFlights {
    getAvailableFlights {
      airlineName
      airlineAddres
      flightCode
      departureCity
      departureDate
      departureTime
      departureInfo
      arrivalCity
      arrivalDate
      arrivalTime
      arrivalInfo
      postedById
      class
      apstatus
      status
      flightEscrow
      createdAt
      updatedAt
      cancelled
      airfare
      delayed
      booked
    }
  }
`;