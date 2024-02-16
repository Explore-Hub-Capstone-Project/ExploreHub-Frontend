import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { EmailSignup } from "./molecules/email-signup";
import { Home } from "./organisms/home";
import LoginPage from "./molecules/LoginPage";
import SignUpPage from "./molecules/SignUpPage";

class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
