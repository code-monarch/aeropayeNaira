import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import BookingDetails from "./BookingDetails";

const style = {
  customModal: `m-0 w-[90%] lg:w-[482px]`,
};

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
        classNames={{
          modal: `${style.customModal}`,
        }}
        open={showBookingSummary}
        onClose={closeBookingModal}
        focusTrapped
        center
        closeIconId="closeButton"
      >
        <BookingDetails
          itinerary={itinerary}
          closeBookingModal={closeBookingModal}
        />
      </Modal>
    </>
  );
};

export default BookingSummaryModal;
