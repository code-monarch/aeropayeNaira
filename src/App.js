import React from "react";
import "./index.css";
import "./styles/main.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./pages/RequireAuth";

import Nav from "./component/Nav";

import { HelmetProvider } from "react-helmet-async"; // This reusable React component will manage all of your changes to the document head

import { useContext } from "react";

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
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TwoFA from "./pages/TwoFA";
import NoMatch from "./pages/NoMatch";

// Toasts Notification
import "react-toastify/dist/ReactToastify.css";

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

      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route path="signup" element={<SignUp />} exact/>
        <Route path="signup/verify" element={<TwoFA />} />
        <Route
          path="flights"
          element={
            <RequireAuth>
              <Flight />
            </RequireAuth>
          }
        />
        <Route
          path="flights/book-flight"
          element={
            <RequireAuth>
              <BookFlight />
            </RequireAuth>
          }
        />
        <Route
          path="wallet"
          element={
            <RequireAuth>
              <Wallet />
            </RequireAuth>
          }
        />
        <Route
          path="wallet/withdraw"
          element={
            <RequireAuth>
              <Withdraw />
            </RequireAuth>
          }
        />
        <Route
          path="wallet/send"
          element={
            <RequireAuth>
              <Send />
            </RequireAuth>
          }
        />
        <Route
          path="wallet/deposit"
          element={
            <RequireAuth>
              <Deposit />
            </RequireAuth>
          }
        />
        <Route
          path="wallet/receive"
          element={
            <RequireAuth>
              <Receive />
            </RequireAuth>
          }
        />
        <Route
          path="transaction-history"
          element={
            <RequireAuth>
              <Transaction />
            </RequireAuth>
          }
        />
        <Route
          path="settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
