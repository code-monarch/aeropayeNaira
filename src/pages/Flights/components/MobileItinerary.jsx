import React, { useState, useRef, useEffect } from "react";
import {
  WarningIcon,
  AeroLogo,
  AirArikLogo,
  AirIbomLogo,
  AirPeaceLogo,
  DanaLogo,
  MobileLineIcon,
  ArrIcon,
  PlaneIcon,
  CalendarIcon,
  DepartureIcon,
  ArrRightIcon,
  BusinessClassIcon,
  EcoClassIcon,
  PremiumEcoClassIcon,
  FirstClassIcon,
} from "./";
import { toastError } from "../../../component/shared/Toasts";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { useVerifEmailStatus } from "../../../utils/EmailVerifStatus";

import { GET_AVAILABLE_FLIGHTS } from "../../../hooks";
import { useQuery } from "@apollo/client";

const MobileItinerary = () => {
  const isVerified = useVerifEmailStatus();
  const [itinerary, setItinerary] = useState("");
  const itineraryRef = useRef(null);

  const [showBookingSummary, setShowBookingSummary] = useState(false);

  const openBookingModal = () => {
    setShowBookingSummary(true);
  };
  const closeBookingModal = () => setShowBookingSummary(false);


  // Show mobile view for screens smaller than 768px or resized to that size
  const [mobileView, setMobileView] = useState(
    window.matchMedia("(max-width:900px)").matches
  );
  // Show mobile view for screens smaller than 360px or resized to that size
  const [smallMobile, setSmallMobile] = useState(
    window.matchMedia("(max-width:360px)").matches
  );

  const { loading, error, data } = useQuery(GET_AVAILABLE_FLIGHTS);
  console.log("getAvailable flights data", data?.getAvailableFlights);

  // get flightcode
  const flightCode = data?.getAvailableFlights?.map((flight) => {
    return flight?.flightCode;
  });

  if (loading) {
    console.log(loading, "loading");
  }
  if (error) {
    console.log(error, "error");
  }
  console.log(data, "available flights");

  useEffect(() => {
    window.addEventListener("resize", () => {
      setMobileView(window.matchMedia("(max-width:900px)").matches);
    });
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSmallMobile(window.matchMedia("(max-width:360px)").matches);
    });
  });
  return (
    <div className="w-full sm:max-w-[600px] flex flex-col items-center">
      {data?.getAvailableFlights?.map((flight) => (
        <div
          className="flex flex-col items-center lg:items-start"
          key={flight?.flightCode}
          ref={itineraryRef}
        >
          {/* Warning */}
          <div className="w-full bg-[#fff6ed] flex items-center py-[9px] px-[13px] mb-[16px] border-[1px] border-[#fce3b9] rounded-[4px]">
            <WarningIcon className={`${mobileView && "w-[40px]"}`} />
            <p className="font-serif font-[400] text-[10px] sm:text-[12px] md:text-[14px] text-black ml-[10px]">
              The availability of this flight will expire in <b>23:30:12 </b>
              if payment is not being made.
            </p>
          </div>
          {/* Itinerary */}
          <div className="flex flex-col items-center w-full rounded-[8px] mb-[32px] shadow-custom">
            {/* Header */}
            <div className="bg-black w-full font-sans text-[14px] text-white font-[500] px-[16px] py-[8px] flex flex-row justify-between items-center rounded-t-[8px]">
              {/* Top */}
              <div className="flex items-center">
                <p className="text-[12px] sm:text-[14px] md:text-[16px]">
                  Itinerary :
                </p>
                <div className="flex items-center text-[12px] sm:text-[14px]">
                  &nbsp;&nbsp; {flight.departureCity} &nbsp;&nbsp;
                  <ArrIcon className="w-[15px] h-[13px] sm:w-[16px] sm:h-[15px] md:w-[19px] md:h-[17px]" />{" "}
                  &nbsp;&nbsp; {flight.arrivalCity}&nbsp;&nbsp;
                </div>
              </div>
              <div className="bg-[#515964] text-[12px] flex justify-center items-center h-[28px] py-[7px] px-[12px] rounded-[4px] whitespace-nowrap">
                <PlaneIcon className="mr-[8px] w-[15px] h-[13px]" />
                One-way
              </div>
            </div>
            {/* Body */}
            <div className="w-full flex flex-col items-center">
              {/* Departure and Arrival Info */}
              <div className="bg-[#EDFFF9] w-full flex flex-col text-black px-[18px] py-[11px]">
                <p className="flex items-center text-[12px] sm-text-[14px] md:text-[16px] mb-[16px]">
                  <DepartureIcon className="mr-[12px] w-[15px] h-[13px]" />
                  Departure:
                  <span className="mx-[12px] text-[12px] sm:text-[14px]">
                    {flight?.departureCity}
                  </span>
                  <ArrRightIcon className="w-[15px] h-[13px] sm:w-[17px] sm:h-[15px] md:w-[19px] md:h-[17px]" />
                  <span className="mx-[12px] text-[12px] sm:text-[14px]">
                    {flight?.arrivalCity}
                  </span>
                </p>
                <div className="flex items-center">
                  <CalendarIcon className="w-[15px] h-[13px] sm:w-[17px] sm:h-[15px] md:w-[19px] md:h-[17px] mr-[12px]" />
                  <p className="text-[12px] sm:text-[14px]">
                    {dateFormat(flight?.departureDate, "mmmm dS, yyyy")}
                  </p>
                </div>
              </div>
              {/* Flight details */}
              <div className="bg-white w-full flex flex-row justify-between px-[17px] py-[22px]">
                {/* Left side */}
                <div className="flex flex-col justify-between sm:ml-[30px] my-[20px]">
                  <p className="font-sans font-[500] text-[18px]">
                    {flight?.departureTime}
                  </p>
                  <p className="font-sans font-[500] text-[18px]">
                    {flight?.arrivalTime}
                  </p>
                </div>
                {/* Left Side End */}
                {/* Middle Side */}
                <div className="flex items-center ml-[-16px] mr-[24px]">
                  <p className="mr-[24px] text-[10px] text-[#8895A7] whitespace-nowrap">
                    1h 30m <br />0 Stops
                  </p>
                  <MobileLineIcon className="h-full" />
                </div>
                {/* Middle Side end */}
                {/* Right Side */}
                <div className="flex flex-col justify-between sm:mr-[25px]">
                  {/* Departure City */}
                  <div>
                    <p className="text-[14px] sm:text-[18px] mb-[4px]">
                      {flight?.departureCity}
                    </p>
                    <p className="text-[10px] text-[#8895A7] max-w-[100px]">
                      Murtala Muhammed International Airport (Nigeria)
                    </p>
                  </div>
                  <div
                    className={`${
                      smallMobile
                        ? "flex flex-col my-[34px]"
                        : "flex flex-row items-center my-[34px]"
                    }`}
                  >
                    <div className="flex items-center w-[57px] mr-[16px] px-[6px] py-[2px] border-[0.5px] border-[#8895A7] rounded-[8px] shadow-none">
                      {flight?.airlineName === "Air Peace" && <AirPeaceLogo />}
                      {flight?.airlineName === "Ibom Air" && <AirIbomLogo />}
                      {flight?.airlineName === "Arik Air" && <AirArikLogo />}
                      {flight?.airlineName === "Dana Air" && <DanaLogo />}
                      {flight?.airlineName === "Aero" && <AeroLogo />}
                    </div>
                    <div
                      className={`${
                        smallMobile ? "w-[55px] mt-[10px]" : "w-[67px]"
                      }`}
                    >
                      {flight?.class === "ECONOMY" && <EcoClassIcon />}
                      {flight?.class === "FIRST_CLASS" && <FirstClassIcon />}
                      {flight?.class === "BUSINESS" && <BusinessClassIcon />}
                      {flight?.class === "PREMIUM_ECONOMY" && (
                        <PremiumEcoClassIcon />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-[14px] sm:text-[18px] mb-[4px]">
                      {flight?.arrivalCity}
                    </p>
                    <p className="text-[10px] text-[#8895A7] max-w-[100px]">
                      Nnamdi Azikwe Airport (Nigeria)
                    </p>
                  </div>
                </div>
                {/* Right Side End */}
              </div>
              {/* Flight details End */}
              {/* Passenger Details */}
              <div className="w-full p-[20px]">
                <div className="w-full flex flex-col sm:flex-row sm:justify-end sm:items-center text-left">
                  {/* <div className="flex items-center mb-[28px] sm:mb-0">
                        <Profile className="w-[25px] h-[20px] mr-[5px]" />
                        <p className="text-[12px]">
                          Passengers:
                          <span className="mx-[8px]">Derek Hale</span>
                        </p>
                      </div> */}
                  {/* Make payment and change flight buttons */}
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        if (isVerified) {
                          itineraryRef.current = flight;
                          const itineraryPointer = itineraryRef.current;
                          setItinerary(itineraryPointer);
                          openBookingModal();
                        } else {
                          toastError("Verify your Email to book flights");
                        }
                      }}
                      className="bg-green h-[42px] text-black text-[14px] font-sans font-[500] py-[15px] mr-[16px] px-[16px] flex justify-center items-center shadow-custom rounded-[6px] whitespace-nowrap"
                    >
                      Make payment
                    </button>
                    <Link
                      to="/flights/book-flight"
                      className="h-[42px] text-black text-[14px] font-sans font-[500] flex justify-center items-center py-[15px] px-[16px] border-[1px] border-green rounded-[6px] shadow-custom whitespace-nowrap"
                    >
                      Change flight
                    </Link>
                  </div>
                  {/* Make payment and change flight buttons end */}
                </div>
              </div>
            </div>
          </div>
          {/* Itinerary End */}
        </div>
      ))}
    </div>
  );
};

export default MobileItinerary;
