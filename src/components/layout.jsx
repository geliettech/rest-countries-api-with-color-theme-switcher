import React from "react";
import Header from "./Header";
import Footer from "./footer";

const Layout = ({className, children}) => {
  return (
    <div className={className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
