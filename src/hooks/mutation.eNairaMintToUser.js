import { gql } from "@apollo/client";

export const ENAIRA_MINT = gql`
  mutation enairaMint($amount: Int!) {
    enairaMint(amount: $amount) {
      status
      message
    }
  }
`;


