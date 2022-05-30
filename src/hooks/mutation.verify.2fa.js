import { gql } from "@apollo/client";

export const VERIFY_2FA_MUTATION = gql`
  mutation Verify2fa($msisdn: String!, $pin: String!) {
    verifyMobileWithTermiiToken(msisdn: $msisdn, pin: $pin) {
      status
      verified
    }
  }
`;
