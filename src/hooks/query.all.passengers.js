import { gql } from "@apollo/client";

export const GET_ALL_PASSENGERS = gql`
  query allPassengers {
    allPassengers {
      id
      email
      firstname
    }
  }
`;
