import { gql } from "@apollo/client";

export const RESEND_2FA_MUTATION = gql`
  mutation Resend2fa($msisdn: String!) {
    sendTermiiTokenToMobile(msisdn: $msisdn) {
      pinId
      verified
      msisdn
      status
      pin
    }
  }
`;
