import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import BookingDetails from "./BookingDetails";

const BookingSummaryModal = ({
  showBookingSummary,
  closeBookingModal,
  itinerary,
  openBookingModal,
  code,
}) => {

  return (
    <>
      <Modal
        open={showBookingSummary}
        onClose={closeBookingModal}
        focusTrapped
        // center
        closeIconId="closeButton"
      >
        <BookingDetails itinerary={itinerary} closeBookingModal={closeBookingModal}/>
      </Modal>
    </>
  );
};

export default BookingSummaryModal;
