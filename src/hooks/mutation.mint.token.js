import { gql } from "@apollo/client";

export const MINT_TOKEN_MUTATION = gql`
  mutation {
    mint {
      status
      message
    }
  }
`;
