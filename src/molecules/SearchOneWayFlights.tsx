import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../organisms/header";
import { ReactComponent as IconSvg } from "../styles/Icons/add_shopping_cart_black_24dp.svg";
import "../styles/SearchOneWay.scss";
import WeatherWidget from "./WeatherWidget";
import { useCart } from "./CartContext";

const SearchOneWayFlight = () => {
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    departureDate,
    searchType,
    travellers,
    flightClass,
    airportData,
    from,
    to,
  } = location.state || {};

  const { addToCart } = useCart();

  const sourceAirportCode = airportData?.fromData?.FromAirportCode;
  const destinationAirportCode = airportData?.toData?.ToAirportCode;
  const date = departureDate;
  const itineraryType = searchType;
  const sortOrder = "PRICE";
  const numberOfAdults = travellers;
  const numberOfSeniors = "0";
  const classOfService = "ECONOMY";

  const fetchFlights = async () => {
    setIsLoading(true);
    const requestBody = {
      sourceAirportCode: sourceAirportCode,
      destinationAirportCode: destinationAirportCode,
      date: date,
      itineraryType: itineraryType,
      sortOrder: sortOrder,
      numAdults: numberOfAdults.toString(),
      numSeniors: numberOfSeniors.toString(),
      classOfService: classOfService,
    };

    console.log("Sending request body:", requestBody);

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/user/search-one-way-flights/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.X_RAPID_API_HOST,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setFlights(data);
    } catch (error) {
      console.error("Failed to fetch flights:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeather = async () => {
    const requestBody = {
      city: to,
    };
    console.log("Sending Weather City", requestBody);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/user/get-weather/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error("Failed to Weather", error);
    }
  };

  const handleAddToCart = (flight) => {
    addToCart(flight);
    console.log("Flight added to cart details", flight);
  };

  useEffect(() => {
    fetchFlights();
    fetchWeather();
  }, []);

  return (
    <div className="main-page-container">
      <Header />
      <WeatherWidget weatherData={weather} />
      <div className="pageContainer">
        <div className="leftColumn">
          {flights.map((flight, index) => (
            <div key={index} className="flightCard">
              <div className="flightHeader">
                <img
                  src={flight["Airline Logo"]}
                  alt={flight.airline}
                  className="airlineLogo"
                />
                <div className="flightDetails">
                  <div className="airlineNameAndNumber">
                    <span className="airlineName">
                      {flight["Airline Name"]}
                    </span>
                    <span className="flightNumber">
                      {flight["Flight Number"]}
                    </span>
                  </div>
                  <div className="flightInfo">
                    <div className="airportCode departureCode">
                      {sourceAirportCode}
                    </div>
                    <div className="flightTimeInfo">
                      <span className="flightDuration">
                        {flight["Duration"]}
                      </span>
                      <span className="flightDepartureArrivalTime">
                        {flight["Departure Time"]} - {flight["Arrival Time"]}
                      </span>
                    </div>
                    <div className="airportCode arrivalCode">
                      {destinationAirportCode}
                    </div>
                  </div>
                  <div className="flightPrice">
                    <span className="price">${flight["Price of Flight"]}</span>
                    <IconSvg
                      className="bookIcon"
                      onClick={() => handleAddToCart(flight)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchOneWayFlight;
