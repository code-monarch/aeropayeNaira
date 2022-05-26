import { gql } from "@apollo/client";

export const BOOK_FLIGHT_MUTATION = gql`
  mutation bookFlight(
    $flightCode: String!
    $departureCity: String!
    $departureDate: String!
    $departureTime: String!
    $arrivalCity: String!
    $arrivalDate: String!
    $arrivalTime: String!
    $numOfAdults: Int!
    $numOfChildren: Int!
    $numOfInfants: Int!
    $amount: String!
    $class: CLASS!
    $flightSeat: String!
  ) {
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
      flightSeat: $flightSeat
{
        bookUpdate{
            airlineName
            airlineAddres
            userFirstName
            userLastName
            $numOfChildren
            numOfInfants
        }
    }
  }
`;