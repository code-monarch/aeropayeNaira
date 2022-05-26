import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/main.css'
import App from './App';
import 'flowbite';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import UserSessionManager from "./helpers/session.manager";
import { AuthProvider } from "./hooks/auth";

const authLink = setContext((_, { headers }) => {
  // const loggedInUser = JSON.parse(
  //   UserSessionManager.getItem(process.env.aeropaye_user)
  // );
  // console.log(loggedInUser)
  // const token = loggedInUser ? loggedInUser.token : null;
  // const token = loggedInUser ? loggedInUser.token : null;
  // console.log(token)
  return {
    headers: {
      ...headers, 
      authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY1MzU1NjAxMH0.NPn5tHSWw7e5DaoXumpOAMTcCTmUBCx15R1b4gE24mw",
    },
  };
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

// Initialize ApolloClient, passing its constructor a configuration object with uri and cache fields:
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
