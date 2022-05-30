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
import { AuthProvider } from "./hooks/auth";
import { setContext } from "@apollo/client/link/context";

// const authLink = setContext((_, { headers }) => {
//   const loggedInUser = JSON.parse(
//     UserSessionManager.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
//   );
//   console.log("loggedIn User", loggedInUser);
//   const token = loggedInUser
//     ? loggedInUser.token
//     : "";
//   console.log("token", token);
//   return {

//     headers: {
//       ...headers,
//       authorization: `Bearer ${token}`,
//     },
//   };
// });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY);
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
  fetchOptions: { mode: "cors" },
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
