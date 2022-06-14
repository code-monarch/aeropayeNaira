import { gql } from "@apollo/client";

export const GET_TRANSACTION_HISTORY = gql`
  query {
    transactions {
      id
      createdAt
      trxType
      description
      amount
      status
    }
  }
`;
