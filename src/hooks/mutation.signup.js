import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation Signup(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $mobile: String!
  ) {
    signup(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      mobile: $mobile
    ) {
      status
      statusMessage
      token
      user {
        id
        firstname
        lastname
        email
        mobile
      }
    }
  }
`;
