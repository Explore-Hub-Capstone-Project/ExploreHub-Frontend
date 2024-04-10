import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { EmailSignup } from "./molecules/email-signup";
import Home from "./organisms/home";
import LoginPage from "./molecules/LoginPage";
import SignUpPage from "./molecules/SignUpPage";
import SearchFlights from "./molecules/SearchFlights";
import SearchRoundTrip from "./molecules/SearchRoundTrip";
import Cart from "./molecules/Cart";
import Attractions from "./molecules/Attractions";
import SearchOneWayFlight from "./molecules/SearchOneWayFlights";

class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search-flights" element={<SearchFlights />} />
          <Route
            path="/search-round-trip-flights"
            element={<SearchRoundTrip />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route
            path="/search-one-way-flights"
            element={<SearchOneWayFlight />}
          />
        </Routes>
      </>
    );
  }
}

export default App;
