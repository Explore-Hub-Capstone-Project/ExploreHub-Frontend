import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/header.scss";

const Header = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.firstname);
          console.log("Name : " + data.firstname);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
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
        <Link to="/discover">Discover</Link>
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
