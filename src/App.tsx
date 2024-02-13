import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { EmailSignup } from "./molecules/email-signup";
import { Home } from "./organisms/home";

class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<EmailSignup />} />
        </Routes>
      </>
    );
  }
}

export default App;
