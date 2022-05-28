import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation Signup(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $mobile: String!
  ) {
    token
    user{
        id
        email
        firstname
        lastname
        mobile
        password
        emailVerified
        mobileVerified
        enabled2FA
        roles
        addr
        pvtKey
    }
    smsTokenStatus
    statusMessage
    status
    }

`;
