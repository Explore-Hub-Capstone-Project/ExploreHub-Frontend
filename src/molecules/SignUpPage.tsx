import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.scss";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    mobile: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formValues };

    const response = await fetch(
      "https://www.explorehub.lol/api/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      // Handle success
      console.log("User registered successfully");
      navigate("/login");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formValues.firstname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formValues.lastname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country of Residence"
            value={formValues.country}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formValues.mobile}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={formValues.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className="already-member">
          Already a member?
          <button onClick={() => navigate("/login")}>Login Here</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
