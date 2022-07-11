// import React from 'react'
// import { useMutation, useQuery } from "@apollo/client";
// import { GET_TRANSACTION_HISTORY } from "../../hooks";

// const RecentHistory = () => {
      // This Function adds commas to amount figures
//   const numberWithCommas = (x) => {
//     return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };
      //Query User Transaction history
//   const {
//     data: transactions,
//   } = useQuery(GET_TRANSACTION_HISTORY);
//   console.log("user Transactions", transactions?.transactions);

//   // Get six transactions from Transactions query
//   const transactionPlusOffset = useMemo(() => {
//     return transactions?.transactions?.slice(0, 4);
//   }, [transactions]);

//   console.log("transactionPlusOffset: ", transactionPlusOffset);
//   return (
//     <div className="recent-history">
//       {(!transactionPlusOffset ||
//         transactionPlusOffset?.transactionPlusOffset?.length === 0) && (
//         <div className="recent-history_list text-center py-[32px] font-medium text-black">
//           No Record Found
//         </div>
//       )}
//       {transactionPlusOffset?.map((transaction, index) => (
//         <div ref={dateRef} key={index}>
//           {/* Transaction History */}
//           <div className="flex justify-between items-center recent-history_list">
//             <div className="flex items-center">
//               {transaction?.trxType === transactTypes.deposit && <FundIcon />}
//               {transaction?.trxType === transactTypes.withdrawal && (
//                 <WithdrawIcon />
//               )}
//               {transaction?.trxType === transactTypes.booking && (
//                 <WithdrawIcon />
//               )}
//               {transaction?.trxType === transactTypes.receive && (
//                 <ReceiveIcon />
//               )}
//               {transaction?.trxType === transactTypes.refund && <ReceiveIcon />}
//               {transaction?.trxType === transactTypes.send && <SendIcon />}
//               <div className="details flex flex-col items-start">
//                 <p className="trans-description">
//                   {transaction?.description}
//                   {/* Withdrawal to bank account */}
//                 </p>
//                 <p className="trans-date">
//                   {`${createdAtDate(
//                     parseInt(transaction.createdAt)
//                   )}, ${createdAtTime(parseInt(transaction.createdAt))}`}
//                 </p>
//               </div>
//             </div>
//             <div className="details flex flex-col items-end">
//               <p className="trans-balance">
//                 {`${
//                   transaction?.trxType === transactTypes.withdrawal ||
//                   transaction?.trxType === transactTypes.send ||
//                   transaction?.trxType === transactTypes.booking
//                     ? "-"
//                     : "+"
//                 } ${numberWithCommas(transaction?.amount)} NGN`}
//               </p>
//               <p className="trans-rate">
//                 {`≈ ${numberWithCommas(transaction?.amount)} ARP`}
//               </p>
//             </div>
//           </div>
//           {/* Transaction History End */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default RecentHistory