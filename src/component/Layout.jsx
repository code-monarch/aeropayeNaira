import React from "react";
import { Outlet } from "react-router-dom"
import Nav from "./Nav";

const Layout = ({children}) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
