import { gql } from "@apollo/client";

export const MAKE_PAYMENT_MUTATION = gql`
  mutation makePayment($amountDeposited: Int) {
    makePayment(amountDeposited: $amountDeposited) {
      data {
        authorization_url
      }
    }
  }
`;
