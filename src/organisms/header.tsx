import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/header.scss";
import { ReactComponent as CartIconSvg } from "../styles/Icons/shopping_cart_FILL0_wght400_GRAD0_opsz24.svg";

const Header = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("userEmail");
    setUserName("");
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/Profile/");
  };

  return (
    <header className="header-container">
      <div className="brand-name">ExploreHub</div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/SearchFlights">Discover</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>

      <div className="auth-buttons">
        {userName ? (
          <div className="user-info">
            <button
              onClick={() => {
                handleProfile();
              }}
              className="user-name"
            >
              Welcome, {userName}
            </button>
            <div>
              <CartIconSvg className="cart-icon" />
            </div>
            <div>
              {" "}
              <button className="text-button" onClick={handleLogout}>
                Logout
              </button>{" "}
            </div>
          </div>
        ) : (
          <>
            <button className="text-button" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="text-button" onClick={() => navigate("/signup")}>
              Signup
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
