import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/main.css";
import App from "./App";
import "flowbite";

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
  const loggedInUser = JSON.parse(
    UserSessionManager.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
  );
  console.log("loggedIn User", loggedInUser);
  const token = loggedInUser
    ? loggedInUser.token
    : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY1MzY5NTI3Nn0.aC0dZ5D_rkiuZUt8R6JSG1B3AZWiLGkFJUIKZeDCGKU";
  console.log("token", token);
  return {
    // headers: {
    //   ...headers,
    //   authorization:
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY1MzY5NTI3Nn0.aC0dZ5D_rkiuZUt8R6JSG1B3AZWiLGkFJUIKZeDCGKU",
    // },
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
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
