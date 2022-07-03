import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/main.css";
import App from "./App";
import "flowbite";
import { BrowserRouter } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { AuthProvider } from "./hooks/auth";
import { EmailVerifStatusProvider } from "./utils/EmailVerifStatus";
// import { OnlineStatusProvider } from "./utils/useOnlineStatus";

import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const loggedInUser = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
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
    <BrowserRouter>
      <AuthProvider>
        {/* <OnlineStatusProvider> */}
        <ApolloProvider client={client}>
          <EmailVerifStatusProvider>
            <App />
          </EmailVerifStatusProvider>
        </ApolloProvider>
        {/* </OnlineStatusProvider> */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
