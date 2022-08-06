import React from "react";
import "./index.css";
import "./styles/main.css";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./component/RequireAuth";
import { HelmetProvider } from "react-helmet-async"; // This reusable React component will manage all of your changes to the document head
import Home from "./pages/Home";
import Flight from "./pages/Flights";
import BookFlight from "./pages/Flights/subPage/BookFlight";
import PayedFlights from "./pages/Flights/subPage/PayedFlights";
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
import ConfirmEmail from "./pages/confirmEmail/ConfirmEmail";
import EmailToken from "./pages/confirmEmail/EmailToken";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import NoMatch from "./pages/NoMatch";

// Toasts Notification
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {" "}
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
        {/* Public Routes */}
        <Route path="login" exact element={<Login />} />
        <Route path="signup" exact element={<SignUp />} />
        <Route path="2FA" exact element={<TwoFA />} />
        <Route path="confirmation" exact element={<ConfirmEmail />} />
        <Route path="forgot-password" exact element={<ForgotPassword />} />
        <Route path="reset-password" exact element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="flights"
          exact
          element={
            <RequireAuth>
              <Flight />
            </RequireAuth>
          }
        />

        <Route
          path="flights/book-flight"
          exact
          element={
            <RequireAuth>
              <BookFlight />
            </RequireAuth>
          }
        />

        <Route
          path="flights/paid-flights"
          exact
          element={
            <RequireAuth>
              <PayedFlights />
            </RequireAuth>
          }
        />

        <Route
          path="wallet"
          exact
          element={
            <RequireAuth>
              <Wallet />
            </RequireAuth>
          }
        />

        <Route
          path="wallet/withdraw"
          exact
          element={
            <RequireAuth>
              <Withdraw />
            </RequireAuth>
          }
        />

        <Route
          path="wallet/send"
          exact
          element={
            <RequireAuth>
              <Send />
            </RequireAuth>
          }
        />

        <Route
          path="wallet/deposit"
          exact
          element={
            <RequireAuth>
              <Deposit />
            </RequireAuth>
          }
        />

        <Route
          path="wallet/receive"
          exact
          element={
            <RequireAuth>
              <Receive />
            </RequireAuth>
          }
        />

        <Route
          path="transaction-history"
          exact
          element={
            <RequireAuth>
              <Transaction />
            </RequireAuth>
          }
        />

        <Route
          path="settings"
          exact
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />

        <Route
          path={"/verify-email"}
          element={
            <RequireAuth>
              <ConfirmEmail />
            </RequireAuth>
          }
        />

        <Route
          path={"/user/verify/:id/:token"}
          element={
            <RequireAuth>
              <EmailToken />
            </RequireAuth>
          }
        />

        {/* Catch All */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
