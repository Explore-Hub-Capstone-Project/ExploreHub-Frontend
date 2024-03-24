import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../organisms/header";
import "../styles/SearchRoundTrip.scss";
import WeatherWidget from "./WeatherWidget";

const SearchRoundTrip = () => {
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [weather, setWeather] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isHotelLoading, setIsHotelLoading] = useState(false);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [selectedHotelDetails, setSelectedHotelDetails] = useState(null);

  const [isFlightLoading, setIsFlightLoading] = useState(false);

  const navigate = useNavigate();

  const {
    from,
    to,
    departureDate,
    returnDate,
    searchType,
    travellers,
    flightClass,
    airportData,
  } = location.state || {};

  const sourceAirportCode = airportData?.fromData?.FromAirportCode;
  const destinationAirportCode = airportData?.toData?.ToAirportCode;
  const date = departureDate;
  const returningDate = returnDate;
  const itineraryType = searchType;
  const sortOrder = "PRICE";
  const numberOfAdults = travellers;
  const numberOfSeniors = "0";
  const classOfService = flightClass;

  const fetchFlights = async () => {
    setIsFlightLoading(true);
    const requestBody = {
      sourceAirportCode: sourceAirportCode,
      destinationAirportCode: destinationAirportCode,
      date: date,
      returnDate: returningDate,
      itineraryType: itineraryType,
      sortOrder: sortOrder,
      numAdults: numberOfAdults,
      numSeniors: numberOfSeniors.toString(),
      classOfService: classOfService,
    };

    console.log("Sending Flight request body:", requestBody);

    try {
      const response = await fetch(
        "http://localhost:5000/user/search-round-trip-flights/",
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
      navigate("/search-flights");
      console.error("Failed to fetch flights:", error);
    } finally {
      setIsFlightLoading(false);
    }
  };

  const fetchWeather = async () => {
    const requestBody = {
      city: to,
    };
    console.log("Sending Weather City", requestBody);

    try {
      const response = await fetch("http://localhost:5000/user/get-weather/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

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

  const fetchHotels = async () => {
    setIsHotelLoading(true);
    const requestBody = {
      geoId: parseInt(airportData?.toData?.To_parent_id, 10),
      checkIn: date,
      checkOut: returningDate,
      adults: parseInt(numberOfAdults, 10),
    };
    console.log("Sending Hotel Request Bodyy", requestBody);

    try {
      const response = await fetch(
        "http://localhost:5000/hotel/search-hotels/",
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
      setHotels(data);
    } catch (error) {
      console.error("Failed to fetch Hotels", error);
    } finally {
      setIsHotelLoading(false);
    }
  };

  const fetchHotelDetails = async (accomodationId) => {
    const requestBody = {
      id: accomodationId,
      checkIn: date,
      checkOut: returningDate,
    };
    console.log("Sending ID to fetch Details", requestBody);
    try {
      const response = await fetch(
        "http://localhost:5000/hotel/get-hotels-details/",
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
      setSelectedHotelDetails(data);
    } catch (error) {
      console.error("Failed to fetch hotel details", error);
    } finally {
    }
  };

  const handleHotelClick = (accomodationId) => {
    fetchHotelDetails(accomodationId);
  };

  useEffect(() => {
    fetchFlights();
    fetchWeather();
    fetchHotels();
  }, []);

  return (
    <div className="main-page-container">
      <Header />
      {/* <div>Space for Weather Data</div> */}
      <WeatherWidget weatherData={weather} />
      <div className="pageContainer">
        <div className="leftColumn">
          {flights.map((flight, index) => (
            <div key={index} className="flightCard">
              {/* Outbound Flight */}
              <div className="flightHeader">
                <img
                  src={flight.outbound["Airline Logo"]}
                  alt={flight.outbound["Airline Name"]}
                  className="airlineLogo"
                />
                <div className="flightDetails">
                  <div className="airlineNameAndNumber">
                    <span className="airlineName">
                      {flight.outbound["Airline Name"]}
                    </span>
                    <span className="flightNumber">
                      {flight.outbound["Flight Number"]}
                    </span>
                  </div>
                  <div className="flightInfo">
                    <div className="airportCode departureCode">
                      {flight.outbound["Source City Code"]}
                    </div>
                    <div className="flightTimeInfo">
                      <span className="flightDuration">
                        {flight.outbound["Duration"]}
                      </span>
                      <span className="flightDepartureArrivalTime">
                        {flight.outbound["Departure Time"]} -{" "}
                        {flight.outbound["Arrival Time"]}
                      </span>
                    </div>
                    <div className="airportCode arrivalCode">
                      {flight.outbound["Destination City Code"]}
                    </div>
                  </div>
                </div>
              </div>
              {/* Return Flight */}
              <div className="flightHeader">
                <img
                  src={flight.return["Airline Logo"]}
                  alt={flight.return["Airline Name"]}
                  className="airlineLogo"
                />
                <div className="flightDetails">
                  <div className="airlineNameAndNumber">
                    <span className="airlineName">
                      {flight.return["Airline Name"]}
                    </span>
                    <span className="flightNumber">
                      {flight.return["Flight Number"]}
                    </span>
                  </div>
                  <div className="flightInfo">
                    <div className="airportCode departureCode">
                      {flight.return["Source City Code"]}
                    </div>
                    <div className="flightTimeInfo">
                      <span className="flightDuration">
                        {flight.return["Duration"]}
                      </span>
                      <span className="flightDepartureArrivalTime">
                        {flight.return["Departure Time"]} -{" "}
                        {flight.return["Arrival Time"]}
                      </span>
                    </div>
                    <div className="airportCode arrivalCode">
                      {flight.return["Destination City Code"]}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flightPrice">
                <span className="price">${flight.price}</span>

                {/* Add to Cart */}
              </div>
            </div>
          ))}
        </div>
        <div className="rightColumn">
          {isHotelLoading ? (
            <div className="spinner">{/* Add Spinner Here */}</div>
          ) : (
            hotels.map((hotel, index) => (
              <div
                key={index}
                className="hotelCard"
                onClick={() => handleHotelClick(hotel.accomodation_id)}
              >
                <div className="hotelInfo">
                  <div className="hotelName">{`${hotel.accomodation}, ${hotel.accomodation_region}`}</div>
                  <div className="primaryInfo">{hotel.breakfast_info}</div>
                  <div className="bubbleRating">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`bubble ${i < hotel.accomodation_rating.rating ? "active" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="priceInfo">
                    <span className="price">{hotel.priceForDisplay}</span>
                    <span className="bookLater">Book now, pay later</span>
                  </div>
                </div>
                {/* Add to cart here */}
              </div>
            ))
          )}
          {selectedHotelDetails && (
            <div className="hotelDetailsPopup">
              <div className="popupContent">
                <h2>{selectedHotelDetails.accomodation_name}</h2>
                <button onClick={() => setSelectedHotelDetails(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchRoundTrip;
