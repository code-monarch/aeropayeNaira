import React from "react";
import Layout from "../Layout";
import SearchFlight from "../flightsComponents/SearchFlight";
import FlightItinerary from "../flightsComponents/FlightItinerary";

const AirlineFlights = () => {
  return (
    <>
      <Layout>
        <div className="bg-bg">
          <SearchFlight />
          <main className="pt-[96px] flex flex-col items-center justify-center">
            <section className="my-[32px] grid grid-cols-3 grid-rows-2 gap-y-[32px] gap-x-[24px]">
            <FlightItinerary />
            <FlightItinerary />
            <FlightItinerary />
            <FlightItinerary />
            <FlightItinerary />
            <FlightItinerary />
            </section>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default AirlineFlights;
