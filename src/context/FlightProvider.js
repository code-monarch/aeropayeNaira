import React,{ useState, createContext, useeffect } from "react";

// stores flight selected for check in or cancel
export const flightContext = createContext();

export const FlightProvider = (props) => {
  const [flight, setFlight] = useState();
  return (
    <flightContext.Provider
      value={{
        flight,
        setFlight,
      }}
    >
      {props.children}
    </flightContext.Provider>
  );
};
