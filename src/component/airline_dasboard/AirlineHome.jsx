import React from "react";
import Banner from "./reusable/Banner";

import { NavLink } from "react-router-dom";

// Layout Wrapper component
// Navigationg Nested in Layout
import Layout from "./Layout";

// Card Icon import
import { ReactComponent as BalanceIcon } from "../../assets/airline_dashboard-icons/balance-icon.svg";
import { ReactComponent as FlightbookIcon } from "../../assets/airline_dashboard-icons/flight_booking-icon.svg";
import { ReactComponent as TotalRevIcon } from "../../assets/airline_dashboard-icons/total_revenue-icon.svg";
import { ReactComponent as UniquePassIcon } from "../../assets/airline_dashboard-icons/unique_passengers-icon.svg";
import { ReactComponent as UpArrowIcon } from "../../assets/airline_dashboard-icons/upArrow-icon.svg";

const style = {
  card: `bg-white w-[421px] h-[206px] py-[26px] px-[32px] rounded-[8px] shadow-sm cursor-pointer`,
  inner_wrapper: `flex justify-between items-top`,
  card_title: `text-base font-normal text-black leading-[20px] font-serif`,
  left_side: `flex flex-col`,
};

const AirlineHome = () => {
  const userName = "Air Peace";
  return (
      <div>
        <Banner userName={userName} />
        <main className="home-container mx-auto">
          {/* main container */}
          <section className="w-[100%] py-[32px] grid grid-cols-3 grid-rows-2 gap-x-[24px] gap-y-[32px] ">
            {/* Card 1 */}
            <NavLink to="/airline/transaction-history">
            <div className={style.card}>
              {/* Inner Wrapper */}
              <div className={style.inner_wrapper}>
                {/* Left Side */}
                <div className={style.left_side}>
                  <div className="Aeropay Balance">
                    <div className={style.card_title}>Aeropaye balance</div>
                    <div className="font-sans font-[800] text-[24px] leading-[28px] mt-[16px] mb-[8px] text-grayDark">
                      0.00000000
                    </div>
                    <div className="text-gray font-serif text-base mb-[16px]">
                      ≈ 0.00 NGN
                    </div>
                    <div className="font-serif flex justify-between items-center text-green w-[74px] h-[20px]">
                      +5.75%
                      <UpArrowIcon />
                    </div>
                  </div>
                </div>
                {/* Left Side End */}
                <div className="mt-[-10px]">
                  <BalanceIcon />
                </div>
              </div>
              {/* Inner Wrapper End */}
            </div>
            </NavLink>
            {/* Card 1 End */}

            {/* Card 2 */}
            <NavLink to="/airline/flights">
            <div className={style.card}>
              {/* Inner Wrapper */}
              <div className={style.inner_wrapper}>
                {/* Left Side */}
                <div className={style.left_side}>
                  {/* Total Flights Booking */}
                  <div className="total_flight_booking">
                    <div className={style.card_title}>
                      Total flights bookings
                    </div>
                    <div className="flex items-center mt-[8px] mb-[20px]">
                      <h3 className="font-sans font-[700] text-[18px] leading-[21px] text-grayDark mr-[8px]">
                        1,331
                      </h3>
                      <div className="leading-[21px] text-gray">
                        (1,584,753.1098 Aeropaye)
                      </div>
                    </div>
                  </div>
                  {/* Total Flight Booking End */}

                  {/* Refunds Issued */}
                  <div>
                    <div className={style.card_title}>Refunds Issued</div>
                    <div className="flex items-center mt-[8px] mb-[20px]">
                      <h3 className="font-sans font-[700] text-[18px] leading-[21px] text-grayDark mr-[8px]">
                        211
                      </h3>
                      <div className="leading-[21px] text-gray">
                        (8,367,000.00 NGN)
                      </div>
                    </div>
                  </div>
                  {/* Refund Issued End */}
                </div>
                {/* Left Side End */}

                {/* Card Icon container */}
                <div className="mt-[-10px]">
                  <FlightbookIcon />
                </div>
                {/* Card Icon Container End */}
              </div>
              {/* Inner Wrapper End */}
            </div>
            </NavLink>
            {/* Card 2 End */}

            {/* Card 3 */}
            <NavLink to="/airline/flights">
            <div className={style.card}>
              {/* Inner Wrapper */}
              <div className={style.inner_wrapper}>
                {/* Left Side */}
                <div className={style.left_side}>
                  {/* Unique Passengers */}
                  <div className="Unique_Passengers mb-[20px]">
                    <div className={style.card_title}>Unique Passengers</div>
                    <h3 className="font-sans font-[700] text-[18px] leading-[21px] text-grayDark mr-[8px]  mt-[8px]">
                      1,520
                    </h3>
                  </div>
                  {/* Unique Passenger End */}

                  {/* Returning Passengers */}
                  <div>
                    <div className={style.card_title}>Returning Passengers</div>
                    <h3 className="font-sans font-[700] text-[18px] leading-[21px] text-grayDark mr-[8px] mt-[8px]">
                      106
                    </h3>
                  </div>
                  {/* Returning Passengers End */}
                </div>
                {/* Left Side End */}

                {/* Card Icon */}
                <div className="mt-[-10px]">
                  <UniquePassIcon />
                </div>
                {/* Card Icon End */}
              </div>
              {/* Inner Wrapper End */}
            </div>
            </NavLink>
            {/* Card 3 End */}

            {/* Card 4 */}
            <NavLink to="/airline/transactions">
            <div className={style.card}>
              {/* Inner Wrapper */}
              <div className={style.inner_wrapper}>
                {/* Left Side */}
                <div className={style.left_side}>
                  {/* Total Revenue */}
                  <div className="Total_Revenue mb-[20px]">
                    <div className={style.card_title}>Total Revenue</div>
                    <div>
                      <h3 className="font-sans font-[700] text-[18px] leading-[21px] text-grayDark mr-[8px] mt-[8px]">
                        (1,584,753.1098 Aeropaye)
                      </h3>
                      <div className="leading-[21px] text-gray mt-[8px] text-base font-[14px] font-serif">
                        (≈ 902,880,060.00 NGN)
                      </div>
                    </div>
                  </div>
                  {/* Total Revenue End */}

                  {/* Total Withdrawals */}
                  <div>
                    <div className={style.card_title}>Total Withdrawals</div>
                    <h3 className="font-sans font-[700] text-[18px] leading-[21px] text-grayDark mr-[8px] mt-[8px]">
                      700,124,534.46 NGN
                    </h3>
                  </div>
                  {/* Total Withdrawals End */}
                </div>
                {/* Left Side End */}

                {/* Card Icon */}
                <div className="mt-[-10px]">
                  <TotalRevIcon />
                </div>
                {/* Card Icon End */}
              </div>
              {/* Inner Wrapper End */}
            </div>
            </NavLink>
            {/* Card 4 End */}
          </section>
          {/* main container end */}
        </main>
      </div>
  );
};

export default AirlineHome;
