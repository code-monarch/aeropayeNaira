import React from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center sticky top-0">
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
