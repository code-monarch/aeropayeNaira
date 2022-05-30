import { gql } from "@apollo/client";

export const VERIFY_2FA_MUTATION = gql`
  mutation verifyMobileWithTermiiToken($msisdn: String!, $pin: String!) {
    verifyMobileWithTermiiToken(msisdn: $msisdn, pin: $pin) {
      verified
      msisdn
    }
  }
`;

