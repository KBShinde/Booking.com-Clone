import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./layout.css"; // Adjust path if necessary
import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
    
        <Navbar />
        <Header />
     
      
      <main className="main-content">{children}</main>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
