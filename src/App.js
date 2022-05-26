import React from "react";
import "./index.css";
import "./styles/main.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Nav from "./component/Nav";

import { HelmetProvider } from "react-helmet-async"; // This reusable React component will manage all of your changes to the document head

import Home from "./pages/Home";
import Flight from "./pages/Flights";
import BookFlight from "./pages/Flights/subPage/BookFlight";
import Wallet from "./pages/Wallet";
import Withdraw from "./pages/Wallet/subPage/Withdraw";
import Send from "./pages/Wallet/subPage/Send";
import Deposit from "./pages/Wallet/subPage/Deposit";
import Receive from "./pages/Wallet/subPage/Receive";
import Transaction from "./pages/Transactions";
import Settings from "./pages/Settings";


function App() {
  return (
      <Router>
        {/* Use Helmet for better SEO */}
        <HelmetProvider>
          <meta charSet="utf-8" />
          <title>Aeropaye Blockchain smart flight refund engine</title>
          <link rel="canonical" href="https://aeropaye.com" />
          <meta
            name="description"
            content="Aeropaye Blockchain smart flight refund and payments engine."
          />
        </HelmetProvider>
        {/*  */}

        {/* Layout */}
        <Nav />
        <Outlet />
        {/* Layout End */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="flights" element={<Flight />} />
          <Route path="flights/book-flight" element={<BookFlight />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="wallet/withdraw" element={<Withdraw />} />
          <Route path="wallet/send" element={<Send />} />
          <Route path="wallet/deposit" element={<Deposit />} />
          <Route path="wallet/receive" element={<Receive />} />
          <Route path="transaction-history" element={<Transaction />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </Router>
  );
}

export default App;
