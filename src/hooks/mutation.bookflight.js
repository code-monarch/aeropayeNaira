import { gql } from "@apollo/client";

export const BOOK_FLIGHT_MUTATION = gql`
  mutation bookFlight(
    $flightCode: String!
    $departureCity: String!
    $arrivalCity: String!
    $departureDate: String!
    $arrivalDate: String!
    $departureTime: String!
    $arrivalTime: String!
    $numOfAdults: Int!
    $numOfChildren: Int
    $numOfInfants: Int
    $amount: String!
    $class: CLASS!
  ) {
    bookFlight(
      flightCode: $flightCode
      departureCity: $departureCity
      departureDate: $departureDate
      departureTime: $departureTime
      arrivalCity: $arrivalCity
      arrivalDate: $arrivalDate
      arrivalTime: $arrivalTime
      numOfAdults: $numOfAdults
      numOfChildren: $numOfChildren
      numOfInfants: $numOfInfants
      amount: $amount
      class: $class
    ) {
      bookUpdate {
        ticketId
        airlineId
        airlineName
        airlineAddres
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
  }
`;
