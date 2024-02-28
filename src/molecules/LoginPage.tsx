import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);


    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const { access_token } = await response.json();
      localStorage.setItem("token", access_token); // Store the token

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);

      console.log("Logged in successfully");
      navigate("/");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to ExploreHub</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"

            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}

            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
