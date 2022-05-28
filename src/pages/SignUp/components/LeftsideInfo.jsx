import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "../../../assets/icons/logo.svg";
import { ReactComponent as Tick } from "../../../assets/icons/tick-circle.svg";

const LeftsideInfo = () => {
  return (
    <div className="signup">
      <NavLink to="/" className="signup-logo">
        <Logo className="w-auto" />
      </NavLink>
      <div>
        <div className="flex signup-details">
          <div className="signup-details_icon">
            <Tick />
          </div>

          <div>
            <p className="signup-details_title">Tokenized ticketing system</p>
            <p className="signup-details_subtitle">
              Aeropaye convert a Tokenized Tickets digit into a digital
              credential that can't be stolen or reused.{" "}
            </p>
          </div>
        </div>

        <div className="flex signup-details">
          <div className="signup-details_icon">
            <Tick />
          </div>
          <div>
            <p className="signup-details_title">Autonomous refund engine</p>
            <p className="signup-details_subtitle">
              On cancelling or delaying the Flight, Aeropaye will process refund
              within seconds from the time of delayed or cancelled flight.
            </p>
          </div>
        </div>

        <div className="flex signup-details items-start">
          <div className="signup-details_icon">
            <Tick />
          </div>
          <div>
            <p className="signup-details_title">
              Blockchain smart contract secured
            </p>
            <p className="signup-details_subtitle">
              Aeropaye Smart contracts improve the time-consuming processes in
              travellers refund claims adjudication to cut cost for Airlines.{" "}
            </p>
          </div>
        </div>
        <div className="flex signup-details">
          <div className="signup-details_icon">
            <Tick />
          </div>
          <div>
            <p className="signup-details_title">
              Access to exclusive discounts
            </p>
            <p className="signup-details_subtitle">
              Aeropaye Offers exclusive discounts.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftsideInfo;
