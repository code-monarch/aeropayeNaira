import { gql } from "@apollo/client";

export const REDEEM_ENAIRA = gql`
  mutation redeemEnaira($amount: String!) {
    redeemEnaira(amount: $amount) {
      status
      message
    }
  }
`;
