import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const BookingFailedModal = ({
  openBookingFailed,
  closeBookingFailed,
  showBookingFailed,
  bookingData,
}) => {
  return (
    <div>
      {" "}
      <Modal
        open={showBookingFailed}
        onClose={closeBookingFailed}
        focusTrapped
        closeIconId="closeButton"
      >
        <div className="modal_container w-[482px] rounded-[8px]">
          {/* Modal Title */}
          <div className="modal_title flex justify-between Header bg-bg px-[24px] py-[16px]">
            <div className="text-[18px] text-black font-medium font-sans">
              Payment Failed
            </div>
            {/* Close SVG */}
            <div
              onClick={closeBookingFailed}
              id="closeButton"
              className="cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5L15 15M5 15L15 5L5 15Z"
                  stroke="#8895A7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          {/* Modal Title End */}

          {/* Booking Failed body */}
          <div className="flex flex-col items-center px-[24px] py-[16px] ">
            <div className="SVG_Wrapper mb-[23px]">
              <svg
                width="56"
                height="57"
                viewBox="0 0 56 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28 56.0326C43.464 56.0326 56 43.4893 56 28.0163C56 12.5433 43.464 0 28 0C12.536 0 0 12.5433 0 28.0163C0 43.4893 12.536 56.0326 28 56.0326Z"
                  fill="#FF6961"
                />
                <path
                  d="M21 21.0112L34.9985 35.0178M34.9985 21.0112L21 35.0178L34.9985 21.0112Z"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            {/* Failure Message */}
            <div className="font-sans  font-[400] text-[16px] text-center text-[#5F6B7A]">
              Your payment could not go through, ensure you have funds in your
              balance and try again.
            </div>
            {/* Try again Button */}
            <div
              initialFocusRef
              onClick={closeBookingFailed}
              className="bg-white w-[100%] text-black font-medium lead-[19px] text-center py-[15px] px-[16px] mt-[16px] border-[1px] border-green shadow-sm rounded-[6px] cursor-pointer"
            >
              Try Again
            </div>

            {/* Cancel Button */}
            <div
              initialFocusRef
              onClick={closeBookingFailed}
              className="bg-[#E1E7EC] w-[100%] text-black  text-center font-medium lead-[19px] py-[15px] px-[16px] border-[1px] border-bg mt-[16px] shadow-sm rounded-[6px] cursor-pointer"
            >
              Cancel
            </div>
          </div>
          {/* Booking Summary body End */}
        </div>
      </Modal>
    </div>
  );
};

export default BookingFailedModal;
