import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/hero.scss";

const Hero = () => {
  const navigate = useNavigate();

  const navigateBasedOnToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/search-flights");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Discover the World</h1>
        <button onClick={navigateBasedOnToken} className="explore-button">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
