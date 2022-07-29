import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation resetPassword($newPassword: String!) {
    resetPassword(newPassword: $newPassword) {
      status
      message
    }
  }
`;
