import { gql } from "@apollo/client";

export const TRANSFER_TOKEN = gql`
  mutation transferToken($recipientAddress: String!, $amount: String!) {
    transferToken(recipientAddress: $recipientAddress, amount: $amount) {
      status
      message
    }
  }
`;
