// import { useState } from "react";
// import "react-responsive-modal/styles.css";
// import { Modal } from "react-responsive-modal";
// // import BookingSummary from "./BookingSummary";
// import { useMutation } from "@apollo/client";
// import { BOOK_FLIGHT_MUTATION } from "../../../hooks";

// const style = {
//   label: `font-sans text-[16px] font-[400] text-black`,
//   inputWrap: `flex items-center h-[48px] mt-[8px] mb-[16px] border-[1px] border-[1px] border-[#E1E7EC] rounded-[6px]`,
//   input: `focus:bg-bg w-[100%] h-[45px] border-[1px] border-[#E1E7EC] rounded-r-[6px] placeholder:text-[#B8C4CE]`,
//   flexedInput: `h-[45px] py-[10px] px-[16px] border-[1px] border-[#E1E7EC] rounded-[6px] focus:bg-bg placeholder:text-[#B8C4CE] overflow-scroll`,
//   svgWrap: `bg-bg h-[100%] p-[15px] rounded-l-[6px]`,
//   card: `card bg-white w-[421px] !mr-[0px] mb-[20px] p-[16px] rounded-[8px] border-[1px] border-[#DDEFFF] cursor-pointer`,
//   inner_wrapper: `card_wrapper `,
//   flightIdWrapper: `flight_id_wrapper h-[43px] flex justify-between p-[13px] bg-bg rounded-[8px]`,
//   flightIdFlex: `flight_id_flex flex items-center p-0`,
//   flightIdText: `flight_Id_text font-sans text-[14px] leading-[17px] font-[500] text-[#41526E] ml-[5.5px]`,
//   flightDetailsWrapper: `flight_details_wrapper w-[389px] flex justify-between my-[16px] p-[11px] rounded-[8px]`,
//   flightDetailsTime: `flight_details_time font-sans font-[500] text-[18px] leading-[21px] text-[#000000]`,
//   flightDetailsLocation: `flight_details_Location font-sans font-[400] text-[14px] leading-[17px] text-[#000000] my-[8px]`,
//   flightDetailsAirport: `flight_details_Airport max-w-[108px] font-serif font-[400] text-[11px] leading-[14px] text-[#8895A7]`,
//   travelDurationWrapper: `travel_dration_wrapper flex flex-col text-[#8895A7] items-center mx-[29px]`,
//   flightManifest: `flight_manifest flex`,
//   flightManifestFlex: `flightManifestFlex flex items-center h-[23px] py-[4px] px-[8px] bg-bg mr-[12px] border-[0.5px] border-[#E2EDF6] rounded-[4px]`,
//   flightManifestSvgWrapper: `flightManifestSvgWrapper flex items-center`,
//   flightManifestFlexText: `flightManifestFlexText font-serif font-[400] min-w-[86px] text-left text-[12px] text-[#8895A7] ml-[6px] tracking-[0.01em] leading-[15px]`,
// };

// const BookingSummaryModal = ({
//   openBookingSummary,
//   onCloseBookingModal,
//   airlineName,
//   flightCode,
//   departureCity,
//   departureDate,
//   departureTime,
//   departureInfo,
//   arrivalCity,
//   arrivalDate,
//   arrivalTime,
//   arrivalInfo,
//   flightEscrow,
// }) => {
//   // State to control Booking success Modal Visibility
//   const [ShowBookingSuccess, setShowBookingSuccess] = useState(false);
//   // State to control Booking Failure Modal Visibility
//   const [ShowBookingFailure, setShowBookingFailure] = useState(false);
//   // Close Booking Modal when booking success modal is visible
//   const onShowBookingSuccess = () => {
//     setShowBookingSuccess(true);
//     onCloseBookingModal();
//   };
//   // Close Booking Success Modal when booking Failure modal is visible
//   // Ideally Either the success Modal or Failure Modal shows depending on whether Payment was made
//   const onShowBookingFailure = () => {
//     setShowBookingFailure(true);
//     onCloseBookingSuccess();
//   };
//   // Function that sets Booking success visibility to false when the close button is pressed
//   const onCloseBookingSuccess = () => setShowBookingSuccess(false);

//   // Function that sets Booking success visibility to false when the close button is pressed
//   const onCloseBookingFailed = () => setShowBookingFailure(false);

//   const [bookFlight, { data, loading, error }] =
//     useMutation(BOOK_FLIGHT_MUTATION);

//   return (
//     <>
//       {/* Booking Successful Modal */}
//       <Modal
//         open={ShowBookingSuccess}
//         onClose={onCloseBookingSuccess}
//         focusTrapped
//         // center
//         closeIconId="closeButton"
//       >
//         <div className="modal_container w-[482px] rounded-[8px]">
//           {/* Modal Title */}
//           <div className="modal_title flex justify-between Header bg-bg px-[24px] py-[16px]">
//             <div className="text-[18px] text-black font-medium font-sans">
//               Payment Successful
//             </div>
//             {/* Close SVG */}
//             <div
//               onClick={onCloseBookingSuccess}
//               id="closeButton"
//               className="cursor-pointer"
//             >
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M5 5L15 15M5 15L15 5L5 15Z"
//                   stroke="#8895A7"
//                   stroke-width="1.5"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//             </div>
//           </div>
//           {/* Modal Title End */}

//           {/* Booking Summary body */}
//           <div className="flex flex-col items-center px-[24px] py-[16px] ">
//             <div className="SVG_Wrapper mb-[23px]">
//               <svg
//                 width="56"
//                 height="56"
//                 viewBox="0 0 56 56"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
//                   fill="#27AE60"
//                 />
//                 <g filter="url(#filter0_d_1857_13363)">
//                   <path
//                     d="M40.8033 22.3766L26.4569 37.135C26.2078 37.3942 25.9089 37.6004 25.5782 37.7413C25.2474 37.8822 24.8916 37.9548 24.5321 37.9548C24.1726 37.9548 23.8168 37.8822 23.4861 37.7413C23.1553 37.6004 22.8564 37.3942 22.6073 37.135L15.2033 29.5158C14.6919 28.9837 14.4062 28.2743 14.4062 27.5362C14.4062 26.7982 14.6919 26.0887 15.2033 25.5566C15.4524 25.2973 15.7512 25.091 16.082 24.9501C16.4128 24.8091 16.7686 24.7365 17.1281 24.7365C17.4877 24.7365 17.8435 24.8091 18.1742 24.9501C18.505 25.091 18.8039 25.2973 19.0529 25.5566L24.5361 31.1966L36.9561 18.4174C37.2052 18.1582 37.5041 17.952 37.8349 17.8111C38.1656 17.6703 38.5214 17.5977 38.8809 17.5977C39.2404 17.5977 39.5962 17.6703 39.927 17.8111C40.2577 17.952 40.5566 18.1582 40.8057 18.4174C41.3166 18.95 41.6017 19.6595 41.6013 20.3975C41.6008 21.1355 41.3149 21.8447 40.8033 22.3766V22.3766Z"
//                     fill="white"
//                   />
//                 </g>
//                 <defs>
//                   <filter
//                     id="filter0_d_1857_13363"
//                     x="8.40625"
//                     y="14.5977"
//                     width="39.1953"
//                     height="32.3569"
//                     filterUnits="userSpaceOnUse"
//                     color-interpolation-filters="sRGB"
//                   >
//                     <feFlood flood-opacity="0" result="BackgroundImageFix" />
//                     <feColorMatrix
//                       in="SourceAlpha"
//                       type="matrix"
//                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                       result="hardAlpha"
//                     />
//                     <feOffset dy="3" />
//                     <feGaussianBlur stdDeviation="3" />
//                     <feColorMatrix
//                       type="matrix"
//                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"
//                     />
//                     <feBlend
//                       mode="normal"
//                       in2="BackgroundImageFix"
//                       result="effect1_dropShadow_1857_13363"
//                     />
//                     <feBlend
//                       mode="normal"
//                       in="SourceGraphic"
//                       in2="effect1_dropShadow_1857_13363"
//                       result="shape"
//                     />
//                   </filter>
//                 </defs>
//               </svg>
//             </div>
//             {/* Success Message */}
//             <div className="font-sans  font-[400] text-[16px] text-center text-[#5F6B7A]">
//               Your flight with Ticketless ID: 890512 has been paid succesfully.
//             </div>
//             {/* Go to Flight Button */}
//             <div
//               onKeyPress={handleKeyPress}
//               initialFocusRef
//               onClick={onShowBookingFailure}
//               className="bg-green w-[100%] py-[15px] px-[16px] text-center mt-[16px] text-white font-medium lead-[19px] shadow-sm rounded-[6px] cursor-pointer"
//             >
//               Go to Flights
//             </div>
//           </div>
//           {/* Booking Summary body End */}
//         </div>
//       </Modal>
//       {/* Booking Successful Modal End */}

//       {/* Payment Failed Modal */}
//       <Modal
//         open={ShowBookingFailure}
//         onClose={onCloseBookingFailed}
//         focusTrapped
//         closeIconId="closeButton"
//       >
//         <div className="modal_container w-[482px] rounded-[8px]">
//           {/* Modal Title */}
//           <div className="modal_title flex justify-between Header bg-bg px-[24px] py-[16px]">
//             <div className="text-[18px] text-black font-medium font-sans">
//               Payment Failed
//             </div>
//             {/* Close SVG */}
//             <div
//               onClick={onCloseBookingFailed}
//               id="closeButton"
//               className="cursor-pointer"
//             >
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M5 5L15 15M5 15L15 5L5 15Z"
//                   stroke="#8895A7"
//                   stroke-width="1.5"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//             </div>
//           </div>
//           {/* Modal Title End */}

//           {/* Booking Failed body */}
//           <div className="flex flex-col items-center px-[24px] py-[16px] ">
//             <div className="SVG_Wrapper mb-[23px]">
//               <svg
//                 width="56"
//                 height="57"
//                 viewBox="0 0 56 57"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M28 56.0326C43.464 56.0326 56 43.4893 56 28.0163C56 12.5433 43.464 0 28 0C12.536 0 0 12.5433 0 28.0163C0 43.4893 12.536 56.0326 28 56.0326Z"
//                   fill="#FF6961"
//                 />
//                 <path
//                   d="M21 21.0112L34.9985 35.0178M34.9985 21.0112L21 35.0178L34.9985 21.0112Z"
//                   stroke="white"
//                   stroke-width="4"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//             </div>
//             {/* Failure Message */}
//             <div className="font-sans  font-[400] text-[16px] text-center text-[#5F6B7A]">
//               Your payment could not go through, ensure you have funds in your
//               balance and try again.
//             </div>
//             {/* Try again Button */}
//             <div
//               onKeyPress={handleKeyPress}
//               initialFocusRef
//               onClick={onCloseBookingFailed}
//               className="bg-white w-[100%] text-black font-medium lead-[19px] text-center py-[15px] px-[16px] mt-[16px] border-[1px] border-green shadow-sm rounded-[6px] cursor-pointer"
//             >
//               Try Again
//             </div>

//             {/* Cancel Button */}
//             <div
//               onKeyPress={handleKeyPress}
//               initialFocusRef
//               onClick={onCloseBookingFailed}
//               className="bg-[#E1E7EC] w-[100%] text-black  text-center font-medium lead-[19px] py-[15px] px-[16px] border-[1px] border-bg mt-[16px] shadow-sm rounded-[6px] cursor-pointer"
//             >
//               Cancel
//             </div>
//           </div>
//           {/* Booking Summary body End */}
//         </div>
//       </Modal>
//       {/* Payment Failed Modal End */}
//     </>
//   );
// };

// export default BookingSummaryModal;
