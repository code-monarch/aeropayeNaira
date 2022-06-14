import { gql } from "@apollo/client";

export const USER_VERIFICATION_STATUS = gql`
  query userVerificationStatus {
    userVerificationStatus
  }
`; 