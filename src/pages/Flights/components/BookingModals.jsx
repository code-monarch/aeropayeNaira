import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ReactComponent as Close } from "../../../assets/dashboard-icons/Close.svg";

// BOOKING MODALS
const BookingModals = ({
  visibleBookingModals,
  makePayment,
  setVisibleBookingModals,
}) => {
    const [bookingSuccess, setbookingSuccess] = useState(false)
    const [bookingFailure, setbookingFailure] = useState(false)

  return (
    <>
      <Modal
        open={() => setVisibleBookingModals(true)}
        closeOnOverlayClick
        onClose={() => setVisibleBookingModals(false)}
        center
      >
        <button onClick={setVisibleBookingModals(false)}>
          <Close />
        </button>
        <p>First modal</p>
        <button className="button" onClick={() => setbookingSuccess(true)}>
          Pay Now
        </button>
      </Modal>

      {/* Booking Success or Booking Failed Modal*/}
      <Modal
        open={() => setbookingSuccess(true)}
        onClose={() => setbookingSuccess(false)}
        closeOnOverlayClick
        center
      >
        <button onClick={() => setbookingSuccess(false)}>
          <Close />
        </button>
        <p>Second modal</p>
        Success!!
        <button
          className="button"
          onClick={() => setVisibleBookingModals(true)}
        >
          Go back
        </button>
      </Modal>
      {/* Booking Failed */}
      {/* <Modal open={openBookingSuccessModal} closeOnOverlayClick center>
        <button onClick={onCloseBookingSummaryModal}>
          <Close />
        </button>
        <p>Second modal</p>
        Success!!
      </Modal> */}
      {/*  */}
    </>
  );
};

export default BookingModals;
