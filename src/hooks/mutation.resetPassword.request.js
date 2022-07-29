import { gql } from "@apollo/client";

export const REQUEST_PASSWORD_REQUEST = gql`
  mutation resetPasswordRequest($email: String!) {
    resetPasswordRequest(email: $email) {
      status
      message
    }
  }
`;
