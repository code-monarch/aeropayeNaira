import { gql } from "@apollo/client";

export const BANK_DETAILS_MUTATION = gql`
  mutation userBankDetails(
    $residentCountry: Country
    $acctName: String!
    $acctBank: String!
    $acctNumber: String!
    $acctType: AccountType
    $acctSwiftCode: String
  ) {
    userBankDetails(
      residentCountry: $residentCountry
      acctName: $acctName
      acctBank: $acctBank
      acctNumber: $acctNumber
      acctType: $acctType
      acctSwiftCode: $acctSwiftCode
    ) {
      status
      message
    }
  }
`;
