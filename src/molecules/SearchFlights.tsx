import React, { useState } from "react";
import Header from "../organisms/header";
import "../styles/SearchFlights.scss";
import { getAirportIDs } from "./GetAirportID";
import { useNavigate } from "react-router-dom";

const FlightSearch = () => {
  const [searchType, setSearchType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState("1");
  const [flightClass, setFlightClass] = useState("ECONOMY");
  const [searchData, setSearchData] = useState(null);

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    if (type === "ONE_WAY") {
      setReturnDate("");
    }
  };

  const navigate = useNavigate();

  const handleSearchClick = async () => {
    try {
      const airportData = await new Promise((resolve, reject) => {
        getAirportIDs(from, to, (data) => resolve(data));
      });

      let path = "";
      switch (searchType) {
        case "ONE_WAY":
          path = "/search-one-way-flights";
          break;
        case "ROUND_TRIP":
          path = "/search-round-trip-flights";
          break;
        default:
          console.error("Unknown search type: " + searchType);
          return;
      }

      const flightDetails = {
        searchType,
        from,
        to,
        airportData,
        departureDate,
        returnDate,
        travellers,
        flightClass,
      };

      localStorage.setItem("flightDetails", JSON.stringify(flightDetails));

      navigate(path, {
        state: {
          searchType,
          from,
          to,
          airportData,
          departureDate,
          returnDate,
          travellers,
          flightClass,
        },
      });
    } catch (error) {
      console.error("Error seeking airport data", error);
    }
  };

  return (
    <div className="home-container">
      <Header />
      <h2 className="search-heading">Let's plan your trip</h2>

      <div className="flight-search-container">
        <div className="flight-search">
          <div className="search-type">
            <button
              disabled
              className={`search-type-button ${searchType === "ONE_WAY" ? "active" : ""}`}
              onClick={() => handleSearchTypeChange("ONE_WAY")}
            >
              One Way
            </button>
            <button
              className={`search-type-button ${searchType === "ROUND_TRIP" ? "active" : ""}`}
              onClick={() => handleSearchTypeChange("ROUND_TRIP")}
            >
              Round Trip
            </button>
          </div>
          <div className="search-fields">
            <div className="field">
              <label>From</label>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="New York"
              />
            </div>
            <div className="field">
              <label>To</label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Delhi"
              />
            </div>
            <div className="field">
              <label>Departure</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                placeholder="Departure Date"
              />
            </div>
            <div className="field">
              <label>Return</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                disabled={searchType !== "ROUND_TRIP"}
                placeholder="Return Date"
              />
            </div>
            <div className="field">
              <label>Travellers</label>
              <select
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="field">
              <label>Class</label>
              <select
                value={flightClass}
                onChange={(e) => setFlightClass(e.target.value)}
              >
                <option>ECONOMY</option>
                <option>PREMIUM_ECONOMY</option>
                <option>BUSINESS</option>
                <option>FIRST_CLASS</option>
              </select>
            </div>
          </div>
          <button onClick={handleSearchClick} className="search-button">
            Search Flights
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
