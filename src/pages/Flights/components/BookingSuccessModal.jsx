import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const BookingSuccessModal = ({
  showBookingSuccess,
  openBookingSuccess,
  closeBookingSuccess,
  openBookingFailed,
  bookingData,
}) => {
  return (
    <div>
      <Modal
        open={showBookingSuccess}
        onClose={closeBookingSuccess}
        focusTrapped
        // center
        closeIconId="closeButton"
      >
        <div className="modal_container w-[482px] rounded-[8px]">
          {/* Modal Title */}
          <div className="modal_title flex justify-between Header bg-bg px-[24px] py-[16px]">
            <div className="text-[18px] text-black font-medium font-sans">
              Payment Successful
            </div>
            {/* Close SVG */}
            <div
              onClick={closeBookingSuccess}
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

          {/* Booking Summary body */}
          <div className="flex flex-col items-center px-[24px] py-[16px] ">
            <div className="SVG_Wrapper mb-[23px]">
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
                  fill="#27AE60"
                />
                <g filter="url(#filter0_d_1857_13363)">
                  <path
                    d="M40.8033 22.3766L26.4569 37.135C26.2078 37.3942 25.9089 37.6004 25.5782 37.7413C25.2474 37.8822 24.8916 37.9548 24.5321 37.9548C24.1726 37.9548 23.8168 37.8822 23.4861 37.7413C23.1553 37.6004 22.8564 37.3942 22.6073 37.135L15.2033 29.5158C14.6919 28.9837 14.4062 28.2743 14.4062 27.5362C14.4062 26.7982 14.6919 26.0887 15.2033 25.5566C15.4524 25.2973 15.7512 25.091 16.082 24.9501C16.4128 24.8091 16.7686 24.7365 17.1281 24.7365C17.4877 24.7365 17.8435 24.8091 18.1742 24.9501C18.505 25.091 18.8039 25.2973 19.0529 25.5566L24.5361 31.1966L36.9561 18.4174C37.2052 18.1582 37.5041 17.952 37.8349 17.8111C38.1656 17.6703 38.5214 17.5977 38.8809 17.5977C39.2404 17.5977 39.5962 17.6703 39.927 17.8111C40.2577 17.952 40.5566 18.1582 40.8057 18.4174C41.3166 18.95 41.6017 19.6595 41.6013 20.3975C41.6008 21.1355 41.3149 21.8447 40.8033 22.3766V22.3766Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_1857_13363"
                    x="8.40625"
                    y="14.5977"
                    width="39.1953"
                    height="32.3569"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="3" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1857_13363"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1857_13363"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            {/* Success Message */}
            <div className="font-sans  font-[400] text-[16px] text-center text-[#5F6B7A]">
              Your flight with Ticketless ID: 890512 has been paid succesfully.
            </div>
            {/* Go to Flight Button */}
            <div
              initialFocusRef
              onClick={openBookingFailed}
              className="bg-green w-[100%] py-[15px] px-[16px] text-center mt-[16px] text-white font-medium lead-[19px] shadow-sm rounded-[6px] cursor-pointer"
            >
              Go to Flights
            </div>
          </div>
          {/* Booking Summary body End */}
        </div>
      </Modal>
    </div>
  );
};

export default BookingSuccessModal;
