import { gql } from "@apollo/client";
export const CHECK_IN = gql`
  mutation checkIn($flightCode: String!) {
    checkIn(flightCode: $flightCode) {
      userId
      status
      username
      airlineName
      flightCode
      departureCity
      departureDate
      arrivalCity
      arrivalDate
      ticketId
    }
  }
`;
