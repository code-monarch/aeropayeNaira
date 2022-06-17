import React from "react";
import { Outlet } from "react-router-dom"
import Nav from "./Nav";

const Layout = ({children}) => {
  return (
    <div className="flex flex-col items-center">
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
