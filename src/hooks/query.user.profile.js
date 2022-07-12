import { gql } from "@apollo/client";

export const USER_PROFILE = gql`
  query {
    getAUser {
      email
      firstname
      lastname
      mobile
      walletBalance
      numOfFlights
      totalFee
      numOfRefunds
      totalRefunds
      totalDeposits
      totalWithdraws
      addr
    }
  }
`;
