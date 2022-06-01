import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/main.css";
import App from "./App";
import "flowbite";

import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "./constants";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import UserSessionManager from "./helpers/session.manager";
import { AuthProvider } from "./hooks/auth";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const loggedInUser = JSON.parse(
    UserSessionManager.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
  );
  const token = loggedInUser ? loggedInUser.token : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
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
