import { gql } from "@apollo/client";

export const BALANCE = gql`
  query {
    balance {
      status
      data {
        status
        data
      }
    }
  }
`;
