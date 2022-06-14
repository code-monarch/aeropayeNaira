import { gql } from "@apollo/client";

export const VERIFY_EMAIL = gql`
  mutation verifyUser {
    verifyUser
  }
`;
