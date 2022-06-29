import { useContext } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ReactComponent as Close } from "../../../assets/dashboard-icons/Close.svg";
import { flightContext } from "../../../context/FlightProvider";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";
import Button from "../../../component/shared/Button";

import { useMutation } from "@apollo/client";
import { GET_BOOKED_FLIGHTS } from "../../../hooks";
import { CANCEL_BOOKING } from "../../../hooks";

const CancelModal = ({
  openCancelModal,
  onCloseCancelModal,
  onCanceled,
  flightToCheckIn,
}) => {
  // const { flight } = useContext(flightContext);

  const [cancelBookings, { data: cancelResponse, loading: canceling }] =
    useMutation(CANCEL_BOOKING, {
      refetchQueries: [
        { query: GET_BOOKED_FLIGHTS }, // DocumentNode object parsed with gql
        "getBookedFlight", // Query name
      ],
    });

  return (
    <Modal open={openCancelModal} onClose={onCloseCancelModal} center>
      <div className="checkin">
        <div className="checkin-header">
          <p className="title">Cancel flight</p>
          <button onClick={onCloseCancelModal}>
            <Close />
          </button>
        </div>

        <div className="checkinmodal-container">
          <p className="subtitle">
            You're about to cancel your trip from Lagos (LOS) to Abuja (ABV)
            scheduled to take-off 08:00 PM local time. Are you sure about this?
            This action cannot be undone.
          </p>

          <div className="cancel-label">
            <p className="cancel-label_title">Reason for cancellation</p>
            <label>
              <textarea
                rows="3"
                placeholder="Why are you cancelling this flight?"
              ></textarea>
            </label>
          </div>

          <Button
            className="cancelFlight-btn"
            type="submit"
            loading={canceling}
            onClick={() => {
              cancelBookings({
                variables: {
                  flightCode: flightToCheckIn?.flightCode,
                },
              })
                .then((res) => {
                    onCanceled();
                    onCloseCancelModal();
                  toastSuccess(`${res?.data?.cancelBookings?.message}`);
                })
                .catch((error) => {
                  toastError(`${error}`);
                });
            }}
          >
            Cancel flight
          </Button>

          <button
            className="cancel-btn"
            type="submit"
            onClick={onCloseCancelModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelModal;
