import React from "react";

import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { BOOK_FLIGHT_MUTATION } from "../../../hooks";
import { GET_AVAILABLE_FLIGHTS } from "../../../hooks";
import { toastError, toastSuccess } from "../../../component/shared/Toasts";
import Button from "../../../component/shared/Button";

import { GET_BOOKED_FLIGHTS } from "../../../hooks";

import dateFormat from "dateformat";

const style = {
  card: `card bg-white w-[100%] md:w-[100%] !mr-[0px] mb-[20px] p-[16px] rounded-[8px] border-[1px] border-[#DDEFFF] cursor-pointer`,
  inner_wrapper: `card_wrapper py-[16px] px-[16px]`,
  flightIdWrapper: `flight_id_wrapper w-[100%] h-[43px] flex items-center justify-between px-[13px] bg-bg rounded-[8px]`,
  flightIdFlex: `flight_id_flex flex w-[50%] items-center p-0`,
  flightIdText: `uppercase flight_Id_text font-sans text-[12px] md:text-[14px] font-[500] text-[#41526E] ml-[5.5px]`,
  flightDetailsWrapper: `flight_details_wrapper w-[100%] flex justify-between my-[16px] p-[11px] rounded-[8px]`,
  flightDetailsTime: `flight_details_time font-sans font-[500] text-[18px] leading-[21px] text-[#000000]`,
  flightDetailsLocation: `flight_details_Location font-sans font-[400] text-[14px] leading-[17px] text-[#000000] my-[8px]`,
  flightDetailsAirport: `flight_details_Airport max-w-[108px] font-serif font-[400] text-[11px] leading-[14px] text-[#8895A7]`,
  travelDurationWrapper: `travel_dration_wrapper flex flex-col text-[#8895A7] items-center lg:mx-[29px]`,
  flightManifest: `flight_manifest flex`,
  flightManifestFlex: `flightManifestFlex flex items-center h-[23px] py-[4px] px-[8px] bg-bg mr-[12px] border-[0.5px] border-[#E2EDF6] rounded-[4px]`,
  flightManifestSvgWrapper: `flightManifestSvgWrapper flex items-center`,
  flightManifestFlexText: `flightManifestFlexText font-serif font-[400] min-w-[86px] text-left text-[12px] text-[#8895A7] ml-[6px] tracking-[0.01em] leading-[15px]`,
};

const BookingDetails = ({
  itinerary,
  closeBookingModal,
  showBookingFailed,
  showBookingSuccess,
}) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const navigate = useNavigate()

  // Get All Flights
  const {
    loading: gettingFlights,
    error: errorWhileGettingFlights,
    data: flightsData,
  } = useQuery(GET_AVAILABLE_FLIGHTS);

  // cycle through the available Flights gotten from the Query and store the values in an array
  const flights = flightsData?.getAvailableFlights?.map((flight) => {
    return {
      flightCode: flight?.flightCode,
      departureCity: flight?.departureCity,
      departureDate: flight?.departureDate,
      arrivalCity: flight?.arrivalCity,
      arrivalDate: flight?.arrivalDate,
      arrivalTime: flight?.arrivalTime,
      departureTime: flight?.departureTime,
      airfare: flight?.airfare,
      class: flight?.class,
      flightSeat: flight?.flightSeat,
    };
  });

  console.log("available flights", flights);

  // cycle through the flight array, return a new array if the modal FlightCode === Itinerary flightCode
  let flightToBook = flights.find(
    (item) => item.flightCode === itinerary?.flightCode
  );
  console.log("my Itemmmmmmmm", flightToBook);
  console.log("flightcode", flightToBook?.flightCode);

  // get Air fare from itinerary and pass to BookFlight mutation variables
  const airfare = itinerary?.airfare;

  // BOOK FLIGHT MUTATION
  const [
    bookFlight,
    { data: bookingData, loading: bookingLoading, error: bookingError },
  ] = useMutation(BOOK_FLIGHT_MUTATION, {
    refetchQueries: [
      { query: GET_BOOKED_FLIGHTS }, // DocumentNode object parsed with gql
      "getBookedFlight", // Query name
    ],
  });

  console.log("amount", flightToBook.airfare);

  // function controls
  const payForFlight = () => {
    bookFlight({
      variables: {
        flightCode: flightToBook?.flightCode,
        departureCity: flightToBook?.departureCity,
        arrivalCity: flightToBook?.arrivalCity,
        departureDate: dateFormat(flightToBook?.departureDate, "mmmm dS, yyyy"),
        arrivalDate: dateFormat(flightToBook?.arrivalDate, "mmmm dS, yyyy"),
        departureTime: flightToBook?.departureTime,
        arrivalTime: flightToBook?.arrivalTime,
        numOfAdults: 1,
        numOfChildren: 0,
        numOfInfants: 0,
        amount: flightToBook?.airfare,
        class: flightToBook?.class,
      },
    })
      .then((res) => {
        if (res?.data) {
          toastSuccess("Booking successful");
          navigate("/flights/paid-flights")
          return showBookingSuccess
        }
      })
      .catch((bookingError) => {
        toastError(bookingError.message);
        return showBookingFailed;
      });
  };
  console.log("mutation error", bookingError);

  console.log("Booked flight", bookingData);
  return (
    <>
      {gettingFlights && <h3>Getting all Available flights...</h3>}
      {errorWhileGettingFlights && (
        <h3>Error while getting available flights</h3>
      )}
      <div className="bg-white w-[100%] lg:w-[482px] !mr-[0px] rounded-[8px]">
        <div className="bg-bg p-[16px] font-size font-[500] text-[18px] text-black text-left">
          Booking Summary
        </div>
        {/* Inner Wrapper */}
        <div className={style.inner_wrapper}>
          <div className={style.card}>
            {/* Flight Id Flex*/}
            <div className={style.flightIdWrapper}>
              {/* Id */}
              <div className={style.flightIdFlex}>
                {/* Svg wrapper */}
                <div>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 5.21025L14.5 9V10.5L8.5 8.6055V12.6255L10.75 13.875V15L7.375 14.25L4 15V13.875L6.25 12.6248V8.60475L0.25 10.5L0.25 9L6.25 5.21025V1.125C6.25 0.826631 6.36853 0.540483 6.5795 0.329505C6.79048 0.118526 7.07663 0 7.375 0C7.67337 0 7.95952 0.118526 8.1705 0.329505C8.38147 0.540483 8.5 0.826631 8.5 1.125V5.21025Z"
                      fill="#41526E"
                    />
                  </svg>
                </div>
                {/* svg wrapper End */}
                <h1
                  className={`${style.flightIdText} !justify-start leading-[15px] lg:leading-[17px]`}
                >
                  Flight ID: {flightToBook?.flightCode}
                </h1>
              </div>
              {/* Id */}
              {/* Flight Date flex*/}
              <div
                className={`${style.flightIdFlex} text-left md:text-left justify-end`}
              >
                {/* Svg wrapper Flight date */}
                <div>
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5627 3.17V2C12.5627 1.6925 12.3077 1.4375 12.0002 1.4375C11.6927 1.4375 11.4377 1.6925 11.4377 2V3.125H6.56267V2C6.56267 1.6925 6.30767 1.4375 6.00017 1.4375C5.69267 1.4375 5.43767 1.6925 5.43767 2V3.17C3.41267 3.3575 2.43017 4.565 2.28017 6.3575C2.26517 6.575 2.44517 6.755 2.65517 6.755H15.3452C15.5627 6.755 15.7427 6.5675 15.7202 6.3575C15.5702 4.565 14.5877 3.3575 12.5627 3.17Z"
                      fill="#41526E"
                    />
                    <path
                      d="M15 7.87988H3C2.5875 7.87988 2.25 8.21738 2.25 8.62988V13.2499C2.25 15.4999 3.375 16.9999 6 16.9999H12C14.625 16.9999 15.75 15.4999 15.75 13.2499V8.62988C15.75 8.21738 15.4125 7.87988 15 7.87988ZM6.9075 14.1574C6.8325 14.2249 6.75 14.2774 6.66 14.3149C6.57 14.3524 6.4725 14.3749 6.375 14.3749C6.2775 14.3749 6.18 14.3524 6.09 14.3149C6 14.2774 5.9175 14.2249 5.8425 14.1574C5.7075 14.0149 5.625 13.8199 5.625 13.6249C5.625 13.4299 5.7075 13.2349 5.8425 13.0924C5.9175 13.0249 6 12.9724 6.09 12.9349C6.27 12.8599 6.48 12.8599 6.66 12.9349C6.75 12.9724 6.8325 13.0249 6.9075 13.0924C7.0425 13.2349 7.125 13.4299 7.125 13.6249C7.125 13.8199 7.0425 14.0149 6.9075 14.1574ZM7.065 11.2849C7.0275 11.3749 6.975 11.4574 6.9075 11.5324C6.8325 11.5999 6.75 11.6524 6.66 11.6899C6.57 11.7274 6.4725 11.7499 6.375 11.7499C6.2775 11.7499 6.18 11.7274 6.09 11.6899C6 11.6524 5.9175 11.5999 5.8425 11.5324C5.775 11.4574 5.7225 11.3749 5.685 11.2849C5.6475 11.1949 5.625 11.0974 5.625 10.9999C5.625 10.9024 5.6475 10.8049 5.685 10.7149C5.7225 10.6249 5.775 10.5424 5.8425 10.4674C5.9175 10.3999 6 10.3474 6.09 10.3099C6.27 10.2349 6.48 10.2349 6.66 10.3099C6.75 10.3474 6.8325 10.3999 6.9075 10.4674C6.975 10.5424 7.0275 10.6249 7.065 10.7149C7.1025 10.8049 7.125 10.9024 7.125 10.9999C7.125 11.0974 7.1025 11.1949 7.065 11.2849ZM9.5325 11.5324C9.4575 11.5999 9.375 11.6524 9.285 11.6899C9.195 11.7274 9.0975 11.7499 9 11.7499C8.9025 11.7499 8.805 11.7274 8.715 11.6899C8.625 11.6524 8.5425 11.5999 8.4675 11.5324C8.3325 11.3899 8.25 11.1949 8.25 10.9999C8.25 10.8049 8.3325 10.6099 8.4675 10.4674C8.5425 10.3999 8.625 10.3474 8.715 10.3099C8.895 10.2274 9.105 10.2274 9.285 10.3099C9.375 10.3474 9.4575 10.3999 9.5325 10.4674C9.6675 10.6099 9.75 10.8049 9.75 10.9999C9.75 11.1949 9.6675 11.3899 9.5325 11.5324Z"
                      fill="#41526E"
                    />
                  </svg>
                </div>
                {/* Svg wrapper Flight Date End*/}
                <h1
                  className={`${style.flightIdText} ml-0 md:ml-[10px] whitespace-normal leading-[15px] lg:leading-[17px]`}
                >
                  {dateFormat(flightToBook?.departureDate, "mmmm dS, yyyy")}
                </h1>
              </div>
              {/* Flight Date End */}
            </div>
            {/* Flight Id Flex End*/}

            {/* Flight Details */}
            <div className={style.flightDetailsWrapper}>
              {/* Departure */}
              <div>
                {/* Departure Time */}
                <h2 className={style.flightDetailsTime}>
                  {flightToBook?.departureTime}
                </h2>
                {/* Departure Location */}
                <h3 className={style.flightDetailsLocation}>
                  {flightToBook?.departureCity}
                </h3>
                {/* Departure Airport */}
                <h4 className={style.flightDetailsAirport}>
                  Murtala Muhammed International Airport (Nigeria)
                </h4>
              </div>
              {/* Departure End */}

              {/* Travel Duration */}
              <div className={style.travelDurationWrapper}>
                {/* Time Duration */}
                <h4 className={style.travelTime}>1h 30m</h4>
                {/* Flight Svg container */}
                <div className={style.travelSvg}>
                  <svg
                    width="91"
                    height="16"
                    viewBox="0 0 91 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.113249 8L3 10.8868L5.88675 8L3 5.11325L0.113249 8ZM3 8.5H4V7.5H3V8.5ZM6 8.5H8V7.5H6V8.5ZM10 8.5H12V7.5H10V8.5ZM14 8.5H16V7.5H14V8.5ZM18 8.5H20V7.5H18V8.5ZM22 8.5H24V7.5H22V8.5ZM26 8.5H28V7.5H26V8.5ZM30 8.5H32V7.5H30V8.5ZM34 8.5H35V7.5H34V8.5Z"
                      fill="#CED6DE"
                    />
                    <path
                      d="M49.0357 8.33333L45.667 13.6667L44.3337 13.6667L46.0177 8.33333L42.4443 8.33333L41.3337 10.3333L40.3337 10.3333L41.0003 7.33333L40.3337 4.33333L41.3337 4.33333L42.445 6.33333L46.0183 6.33333L44.3337 1L45.667 1L49.0357 6.33333L52.667 6.33333C52.9322 6.33333 53.1866 6.43869 53.3741 6.62623C53.5616 6.81376 53.667 7.06812 53.667 7.33333C53.667 7.59855 53.5616 7.8529 53.3741 8.04044C53.1866 8.22798 52.9322 8.33333 52.667 8.33333L49.0357 8.33333Z"
                      fill="#8895A7"
                    />
                    <path
                      d="M91 8L86 5.11325V10.8868L91 8ZM59 8.5H60V7.5H59V8.5ZM62 8.5H64V7.5H62V8.5ZM66 8.5H68V7.5H66V8.5ZM70 8.5H72V7.5H70V8.5ZM74 8.5H76V7.5H74V8.5ZM78 8.5H80V7.5H78V8.5ZM82 8.5H84V7.5H82V8.5ZM86 8.5H88V7.5H86V8.5Z"
                      fill="#CED6DE"
                    />
                  </svg>
                </div>
                {/* Stops */}
                <h4 className={style.travelStops}>0 Stops</h4>
              </div>
              {/* Travel Duration End */}
              {/* Arrival */}
              <div>
                {/* Arrival Time */}
                <h2 className={`${style.flightDetailsTime} text-right`}>
                  {flightToBook?.arrivalTime}
                </h2>
                {/* Arrival Location */}
                <h3 className={`${style.flightDetailsLocation} text-right`}>
                  {flightToBook?.arrivalCity}
                </h3>
                {/* Arrival Airport */}
                <h4 className={`${style.flightDetailsAirport} text-right`}>
                  Nnamdi Azikiwe International Airport (Nigeria)
                </h4>
              </div>
              {/* Arrival End */}
            </div>
            {/* Flight Details End*/}
          </div>
          {/* Flight Itinerary End */}

          {/* Flight Fare Summary */}
          <div className="card bg-bg w-[421px]!mr-[0px] mb-[20px] py-[16px] px-[16px] rounded-[8px] border-[1px] border-[#DDEFFF] cursor-pointer">
            {/* Number of Passenger */}
            <div className="flex justify-between mb-[16px]">
              <div className="no_passengers text-black font-sans font-[400] text-[16px]">
                1 Passengers:
              </div>
              {/* Cost */}
              <div className="text-right">
                <div className="text-black font-sans font-[400] text-[16px]">
                  {numberWithCommas(airfare)}&nbsp;ARP
                  {/* 122.8070 ARP */}
                </div>
                <div className="text-[14px] font-sans font-[400] text-[#5F6B7A]">
                  {`(≈${numberWithCommas(airfare)} NGN)`}
                  {/* (≈ 122,8070 NGN) */}
                </div>
              </div>
              {/* Number of Passengers */}
            </div>
            {/* Number of Passenger End */}

            {/* Discounts */}
            <div className="discount flex justify-between mb-[16px]">
              <div className="no_passengers text-black font-sans font-[400] text-[16px]">
                Discounts:
              </div>
              {/* Cost */}
              <div className="text-right">
                <div className="text-[14px] font-sans font-[400] text-[#5F6B7A]">
                  0.00 NGN
                </div>
              </div>
            </div>
            {/* Discounts End */}

            {/* Total */}
            <div className="flex justify-between">
              <div className="no_passengers text-black font-[500] font-sans text-[16px]">
                Total:
              </div>
              {/* Cost */}
              <div className="text-right">
                <div className="text-black font-sans font-[500] text-[16px]">
                  {numberWithCommas(airfare)}&nbsp;
                  {/* ARP 122.8070 ARP */}
                </div>
                <div className="text-[14px] font-sans font-[500] text-[#5F6B7A]">
                  {`(≈${numberWithCommas(airfare)} NGN)`}
                  {/* (≈ 122,8070 NGN) */}
                </div>
              </div>
              {/* Number of Passengers */}
            </div>
            {/* Total End */}
          </div>
          {/* Flight Fare End */}
          <div>
            <Button
              onClick={() => {
                payForFlight();
              }}
              className="bg-[#060A33] w-[100%] flex justify-center items-center text-center rounded-[8px] text-white p-[16px] font-sans cursor-pointer"
              type="submit"
              loading={bookingLoading}
            >
              Pay now
              <span className="font-[500] inline text-[20px]">
                &nbsp;{numberWithCommas(airfare)}&nbsp;
              </span>
              ARP
            </Button>
            <div
              className="text-center font-serif text-[#5F6B7A] font-[400] mt-[16px] mb-[16px] cursor-pointer"
              onClick={closeBookingModal}
            >
              I will pay later
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
