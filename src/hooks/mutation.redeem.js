import { gql } from "@apollo/client";

export const REDEEM_FIAT_MUTATION = gql`
  mutation redeemFiat($amount: String!, $accountToWithdraw: String!) {
    redeemFiat(amount: $amount, accountToWithdraw: $accountToWithdraw) {
      status
      message
    }
  }
`;
