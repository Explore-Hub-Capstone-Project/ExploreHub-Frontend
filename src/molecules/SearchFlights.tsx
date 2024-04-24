import React, { useState, useEffect } from "react";
import Header from "../organisms/header";
import "../styles/SearchFlights.scss";
import { getAirportIDs } from "./GetAirportID";
import { useNavigate } from "react-router-dom";

const FlightSearch = () => {
  const images = [
    "https://images.unsplash.com/photo-1562428309-f97fc8e256e7?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531464882680-9a02c0b5818e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    images.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [url]: true }));
      };
    });

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
      const airportData = await getAirportIDs(from, to, () => {});
      // const airportData = await new Promise((resolve, reject) => {
      //   getAirportIDs(from, to, (data) => resolve(data));
      // });

      console.log({ airportData });

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
        state: flightDetails,
      });
    } catch (error) {
      console.error("Error seeking airport data", error);
    }
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <Header />
      <h2 className="search-heading">Let's plan your trip</h2>

      <div className="flight-search-container">
        <div className="flight-search">
          <div className="search-type">
            <button
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
                <option>FIRST</option>
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
