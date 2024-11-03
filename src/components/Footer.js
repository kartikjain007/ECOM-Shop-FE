import React from "react";
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
        <p>Privacy Policy | Terms of Service | Contact Us</p>
      </div>
    </footer>
  );
};

export default Footer;
