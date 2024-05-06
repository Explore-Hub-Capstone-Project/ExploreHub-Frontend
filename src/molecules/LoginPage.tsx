import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const incorrectPassword = () => toast.error("Wrong Password, Try Again!");
  const [notification, setNotification] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/user/login",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const { access_token, user } = await response.json();
      localStorage.setItem("token", access_token);
      localStorage.setItem("userEmail", user.email);
      console.log("Logged in successfully");
      navigate("/");
    } else {
      setNotification("Error");
      incorrectPassword();
      console.error("Login failed");
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {notification && (
          <div>
            {" "}
            <ToastContainer />{" "}
          </div>
        )}
        <h2>Login to ExploreHub</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="password-box">
            <input
              type={type}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <span className="flex space-around" onClick={handleToggle}>
              <Icon className="mr-10" icon={icon} size={25} />
            </span>
          </div>

          <button type="submit">Login</button>
        </form>
        <div className="alternative-action">
          Not a member?{" "}
          <button onClick={() => navigate("/signup")}>Signup Here</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
