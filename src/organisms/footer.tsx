import React from "react";
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        © {new Date().getFullYear()} ExploreHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
