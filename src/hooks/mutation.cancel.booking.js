import { gql } from "@apollo/client";

export const CANCEL_BOOKING = gql`
  mutation cancelBookings($flightCode: String!) {
    cancelBookings(flightCode: $flightCode) {
      status
      message
    }
  }
`;
