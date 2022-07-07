import { gql } from "@apollo/client";

export const GET_DEPOSIT_QRCODE = gql`
  mutation {
    getDepositQRCode {
      status
      message
      data
    }
  }
`;
