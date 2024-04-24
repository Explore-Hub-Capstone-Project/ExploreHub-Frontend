import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CountryList from "react-select-country-list";
import "../styles/SignUpPage.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

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

  const options = useMemo(() => CountryList().getData(), []);
  const [country, setCountry] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCountryChange = (value) => {
    setFormValues({
      ...formValues,
      country: value.label,
    });
  };

  const handlePhoneChange = (value) => {
    setFormValues((prev) => ({
      ...prev,
      mobile: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formValues };

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/user/register",
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
          <Select
            options={options}
            onChange={handleCountryChange}
            value={options.find(
              (option) => option.label === formValues.country
            )}
            placeholder="Select Country"
            classNamePrefix="select"
          />
          <PhoneInput
            international
            defaultCountry="US"
            value={formValues.mobile}
            onChange={handlePhoneChange}
            placeholder="Enter phone number"
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
