import React from "react";
import Header from "./header";
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
