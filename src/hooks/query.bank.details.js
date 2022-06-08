import { gql } from "@apollo/client";

export const GET_BANK_DETAILS = gql`
  query userBankDetails {
    userBankDetails {
      acctResCountry
      acctName
      acctBank
      acctNumber
      acctType
      acctSwiftCode
    }
  }
`;
