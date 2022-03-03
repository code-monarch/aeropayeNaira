import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import Index from './component/dashboard/Index';
import Home from './component/dashboard/Home';
import Transaction from './component/dashboard/Transaction';
import Wallet from './component/dashboard/Wallet';
import Withdraw from './component/dashboard/wallet/Withdraw';
import Send from './component/dashboard/wallet/Send';
import Deposit from './component/dashboard/wallet/Deposit';
import Receive from './component/dashboard/wallet/Receive';
import Settings from './component/dashboard/Settings';
import Flight from './component/dashboard/Flight';
import BookFlight from './component/dashboard/flight/BookFlight';

function App() {
  return (
    <Router>
      <Helmet>
          <meta charSet='utf-8' />
          <title>Aeropaye Blockchain smart flight refund engine</title>
          <link rel='canonical' href='https://aeropaye.com' />
          <meta
            name='description'
            content='Aeropaye Blockchain smart flight refund and payments engine.'
          />
        </Helmet>
      <Routes>
        <Route
            path="/"element={<Index />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/transaction-history" element={<Transaction />} />
          <Route path="/wallet" element={<Wallet />} />
            <Route path="wallet/withdraw" element={<Withdraw />} />
            <Route path="wallet/send" element={<Send />} />
            <Route path="wallet/deposit" element={<Deposit />} />
            <Route path="wallet/receive" element={<Receive />} />
          
          
          <Route path="/settings" element={<Settings />} />

          <Route path="/flight" element={<Flight />} />
          <Route path="/book-flight" element={<BookFlight />} />
          
      </Routes>

    </Router>
  );
}

export default App;
