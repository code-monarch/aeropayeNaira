import React, { useState, useEffect } from "react";
import { ReactComponent as Arrow } from "../../../assets/icons/arrow-down.svg";
import { ReactComponent as Arrival } from "../../../assets/icons/arrival-icon.svg";
import { ReactComponent as Departure } from "../../../assets/icons/departure-icon.svg";
import { ReactComponent as Switch } from "../../../assets/icons/switch.svg";
import { ReactComponent as Calendar } from "../../../assets/icons/calendar-2.svg";
import { ReactComponent as Tick } from "../../../assets/icons/tick.svg";
import { CabinClass } from "../../../data/dropdown-options";
import { ReactComponent as Minus } from "../../../assets/icons/minus.svg";
import { ReactComponent as Add } from "../../../assets/icons/plus.svg";
import MobileBooking from "../../../component/mobile/Booking";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const [tripType, setTripType] = useState(["One-Way"]);
  const [cabin, setCabin] = useState("Economy");
  const [mobileView, setMobileView] = useState(
    window.matchMedia("(max-width:972px)").matches
  );
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [passenger, setPassenger] = useState(
    adultCount + childCount + infantCount
  );
  const [tick, setTick] = useState(null);
  const [departDate, setDepartDate] = useState(null);
  const [arriveDate, setArriveDate] = useState(null);

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const switchText = () => {
    var temp;
    temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  const calculateTotal = () => {
    setPassenger(adultCount + childCount + infantCount);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setMobileView(window.matchMedia("(max-width:972px)").matches);
    });
  });

  const showTick = (a) => {
    console.log(a);
    CabinClass.forEach((item, index) => {
      if (a === index) {
        setTick(index);
      }
    });
  };

  return (
    <>
      {mobileView ? (
        <MobileBooking
          childCount={childCount}
          setAdultCount={setAdultCount}
          setChildCount={setChildCount}
          adultCount={adultCount}
          infantCount={infantCount}
          setInfantCount={setInfantCount}
          CabinClass={CabinClass}
          showTick={showTick}
          tick={tick}
          switchText={switchText}
          departure={departure}
          arrival={arrival}
          setDeparture={setDeparture}
          setArrival={setArrival}
        />
      ) : (
        <div
          className={
            tripType === "Round Trip"
              ? "booking-container-2"
              : "booking-container"
          }
        >
          <div className="flex items-center">
            <button
              className="booking-container-dropdown dropdown-1 flex items-center justify-between"
              onClick={() =>
                tripType === "One-Way"
                  ? setTripType("Round Trip")
                  : setTripType("One-Way")
              }
            >
              <div>{tripType}</div>
              <Arrow />
            </button>

            <div className="booking-container-dropdown dropdown-2 flex items-center justify-between relative">
              <div className="dropdown dropdown-end">
                <div tabIndex="1" className="relative">
                  {passenger} Passenger
                </div>
                <ul
                  tabIndex="1"
                  className="dropdown-2-container bg-white menu dropdown-content absolute top-8 z-[9999] left-0 "
                >
                  <li className="mb-[20px]">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="passenger-type">Adults</p>
                        <p className="passenger-des">Over 12 years</p>
                      </div>

                      <div className="counter flex justify-between items-center">
                        <button
                          className={`${
                            adultCount === 0 ? "non-active" : "active-icon"
                          }`}
                          onClick={() =>
                            adultCount > 0 && setAdultCount(adultCount - 1)
                          }
                        >
                          <Minus />
                        </button>

                        <p className="mx-[10px]">{adultCount}</p>

                        <button
                          onClick={() => setAdultCount(adultCount + 1)}
                          className="active-icon"
                        >
                          <Add />
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="mb-[20px]">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="passenger-type">Children</p>
                        <p className="passenger-des">2 - 12 years</p>
                      </div>

                      <div className="counter flex justify-between items-center">
                        <button
                          className={`${
                            childCount === 0 ? "non-active" : "active-icon"
                          }`}
                          onClick={() =>
                            childCount > 0 && setChildCount(childCount - 1)
                          }
                        >
                          <Minus />
                        </button>
                        <p className="mx-[10px]">{childCount}</p>
                        <button
                          onClick={() => setChildCount(childCount + 1)}
                          className="active-icon"
                        >
                          <Add />
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="passenger-type">Infants</p>
                        <p className="passenger-des">Below 12 years</p>
                      </div>

                      <div className="counter flex justify-between items-center">
                        <button
                          className={`${
                            infantCount === 0 ? "non-active" : "active-icon"
                          }`}
                          onClick={() =>
                            infantCount > 0 && setInfantCount(infantCount - 1)
                          }
                        >
                          <Minus />
                        </button>
                        <p className="mx-[10px]">{infantCount}</p>
                        <button
                          onClick={() => setInfantCount(infantCount + 1)}
                          className="active-icon"
                        >
                          <Add />
                        </button>
                      </div>
                    </div>
                  </li>

                  <button className="btn-confirm" onClick={calculateTotal}>
                    Confirm
                  </button>
                </ul>
              </div>
              <Arrow />
            </div>

            <div className="booking-container-dropdown dropdown-3 flex items-center justify-between">
              <div className="dropdown dropdown-end">
                <div tabIndex="2" className="relative">
                  {cabin}
                </div>

                <ul
                  tabIndex="2"
                  className="dropdown-3-container menu dropdown-content absolute top-8 z-[9999] left-0"
                >
                  {CabinClass.map((i, index) => (
                    <li
                      key={index}
                      className={`${tick === index ? "selected" : ""}`}
                    >
                      <button
                        className="flex items-center"
                        onClick={() => {
                          setCabin(i);
                          showTick(index);
                        }}
                      >
                        <Tick
                          className={`mr-2 ${
                            tick === index ? "visible" : "invisible"
                          }`}
                        />
                        {i}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <Arrow className="ml-4" />
            </div>
          </div>

          <div className="flex xl:flex-nowrap flex-wrap">
            <div className="flex relative">
              <div className="departure flex items-center">
                <span>
                  <Departure />
                </span>
                <input
                  type="text"
                  placeholder="Departure airport or city"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="switch-button"
                onClick={switchText}
              >
                <Switch />
              </button>
            </div>

            <div className="arrival flex items-center">
              <span>
                <Arrival />
              </span>
              <input
                type="text"
                placeholder="Destination airport or city"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
              />
            </div>

            {tripType === "Round Trip" ? (
              <div className="flight-date-2 flex items-center">
                <span>
                  <Calendar />
                </span>
                <div className="">
                  <p className="text-1">Leaving on</p>
                  <DatePicker
                    selected={departDate}
                    onChange={(date) => setDepartDate(date)}
                    selectsStart
                    dateFormat="MMM dd, yyyy"
                    placeholderText="Feb 07, 2022"
                    className="booking-dates"
                  />
                </div>

                <div className="line"></div>

                <div className="">
                  <p className="text-1">Returning on</p>
                  <DatePicker
                    selected={arriveDate}
                    onChange={(date) => setArriveDate(date)}
                    selectsStart
                    dateFormat="MMM dd, yyyy"
                    placeholderText="Mar 07, 2022"
                    className="booking-dates"
                  />
                </div>
              </div>
            ) : (
              <div className="flight-date flex items-center">
                <span>
                  <Calendar />
                </span>
                <div className="">
                  <p className="text-1">Leaving on</p>
                  <DatePicker
                    selected={departDate}
                    onChange={(date) => setDepartDate(date)}
                    selectsStart
                    dateFormat="MMM dd, yyyy"
                    placeholderText="Feb 07, 2022"
                    className="booking-dates"
                  />
                </div>
              </div>
            )}

            {/* Search Flight */}
            <button className="search_button">Search Flight</button>
            {/* Search Flight End */}
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
