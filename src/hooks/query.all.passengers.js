import { gql } from "@apollo/client";

export const GET_AIRLINE_FLIGHTS = gql`
  query getAirlineFlights {
    airlineName
  }
`;
