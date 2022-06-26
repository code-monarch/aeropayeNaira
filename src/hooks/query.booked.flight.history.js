import { gql } from "@apollo/client";

export const FLIGHT_HISTORY = gql`
  query {
    bookedFlightHistory {
      departureCity
      arrivalCity
      departureDate
    }
  }
`;
