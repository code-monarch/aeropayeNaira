import React, { useState } from "react";
import Booking from "../components/Booking";
import Layout from "../../../component/Layout"

const BookFlight = () => {
  return (
    <>
      <Layout>
        <div className="booking-detail w-screen 2xl:mx-[auto]">
          <div className="book-section">
            <Booking />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BookFlight;
