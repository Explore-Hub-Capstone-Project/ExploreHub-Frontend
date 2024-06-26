import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/header.scss";
import { useCart } from "../molecules/CartContext";
import { ReactComponent as CartIconSvg } from "../styles/Icons/shopping_cart_FILL0_wght400_GRAD0_opsz24.svg";

const Header = () => {
  const [userName, setUserName] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(process.env.REACT_APP_BACKEND_URL + "/user/me", {
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
    localStorage.removeItem("userEmail");
    window.location.reload();
    setUserName("");
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/Profile/");
  };

  const handleCartClick = () => {
    navigate("/cart/");
    console.log("Cart Clicked");
  };

  return (
    <header className="header-container">
      <div className="brand-name">ExploreHub</div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        {/* <Link to="/discover">Discover</Link> */}
        <Link to="/ServicesPage">Services</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="https://github.com/Explore-Hub-Capstone-Project">
          Contact Us
        </Link>
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
            <div onClick={handleCartClick} style={{ cursor: "pointer" }}>
              <CartIconSvg className="cart-icon" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
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
