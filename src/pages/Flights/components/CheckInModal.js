import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ReactComponent as Close } from "../../../assets/dashboard-icons/Close.svg";

import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOKED_FLIGHTS } from "../../../hooks";
// import { FLIGHT_HISTORY } from "../../../hooks";
import { CHECK_IN } from "../../../hooks";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";

import Button from "../../../component/shared/Button";

const CheckInModal = ({
  open,
  onOpenModal,
  onCloseModal,
  onChecked,
  flightToCheckIn,
}) => {
  const [checkIn, { loading: checkingIn }] = useMutation(CHECK_IN, {
    refetchQueries: [
      { query: GET_BOOKED_FLIGHTS }, // DocumentNode object parsed with gql
      "getBookedFlight", // Query name
    ],
    onCompleted() {
      onCloseModal();
    },
  });

  // Get Passenger Booked Flights
  const { data: bookedFlights } = useQuery(GET_BOOKED_FLIGHTS);
  console.log("UserBooked Flights:", bookedFlights);

  const flights = bookedFlights?.getBookedFlight?.map((flight) => {
    return {
      flightCode: flight?.flightCode,
    };
  });
  console.log("flightss: ", flights);

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div className="checkin">
        <div className="checkin-header">
          <p className="title">Check-in</p>
          <button onClick={onCloseModal}>
            <Close />
          </button>
        </div>

        <div className="checkinmodal-container">
          <p className="subtitle">
            By checking in, you agree that you have accepted your boarding pass
            for this flight [Ticketless ID]. Subject to the airline terms, you
            cannot claim any refund thereof once you've checked in.
          </p>

          <Button
            className="checkin-btn"
            type="submit"
            loading={checkingIn}
            disabled={checkingIn}
            onClick={() => {
              checkIn({
                variables: {
                  flightCode: flightToCheckIn?.flightCode,
                },
              })
                .then((res) => {
                  toastSuccess(`${res?.data?.checkIn?.status}`);
                  onChecked();
                  onCloseModal();
                })
                .catch((error) => {
                  toastError(`${error?.message}`);
                });
            }}
          >
            Yes, check-in
          </Button>

          <button className="cancel-btn" type="submit" onClick={onCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckInModal;
