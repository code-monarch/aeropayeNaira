import { gql } from "@apollo/client";

export const MAKE_PAYMENT_MUTATION = gql`
  mutation makePayment($amountDeposited: Int) {
    makePayment(amountDeposited: $amountDeposited) {
      status
      message
      data {
        authorization_url
        access_code
        reference
      }
    }
  }
`;
