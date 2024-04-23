import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../organisms/header";
import "../styles/SearchRoundTrip.scss";
import WeatherWidget from "./WeatherWidget";
import HotelWidget from "./HotelWidget";
import { ReactComponent as IconSvg } from "../styles/Icons/add_shopping_cart_black_24dp.svg";
import { useCart } from "./CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BounceLoader } from "react-spinners";
import Lottie from "react-lottie";
import animationData from "../styles/animations/Animation - 1713904519543.json";

const SearchRoundTrip = () => {
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [weather, setWeather] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isHotelLoading, setIsHotelLoading] = useState(false);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selectedHotelDetails, setSelectedHotelDetails] = useState(null);
  const [isFlightLoading, setIsFlightLoading] = useState(false);
  const flightNotify = () => toast.success("Flight Added to Cart!");
  const hotelNotify = () => toast.success("Hotel Added to Cart!");
  const searchFailed = () => toast.error("API Error, Try Again!");
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { addToCart } = useCart();

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
        process.env.REACT_APP_BACKEND_URL + "/user/search-round-trip-flights/",
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
      searchFailed();
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
      console.log({ "/user/get-weather/": data });
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
      setIsDataLoading(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/hotel/search-hotels/",
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
      setIsDataLoading(false);
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
        process.env.REACT_APP_BACKEND_URL + "/hotel/get-hotels-details/",
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

  const handleAddToCart = (flight) => {
    addToCart(flight);
    setNotification("Flight added to Cart");
    flightNotify();
    console.log("Flight added to cart details", flight);
  };

  const handleAddHotelToCart = (hotel) => {
    addToCart(hotel);
    localStorage.setItem("hotelDetails", JSON.stringify(hotel));
    setNotification("Hotel added to Cart");
    hotelNotify();
    console.log("Hotel added to cart details", hotel);
  };

  useEffect(() => {
    fetchFlights();
    fetchWeather();
    fetchHotels();
  }, []);

  if (isDataLoading) {
    return (
      <div className="loading-container">
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          className="lottie-animation"
          isStopped={!isDataLoading}
          isPaused={!isDataLoading}
        />
      </div>
    );
  }

  return (
    <div className="main-page-container">
      <Header />
      <WeatherWidget weatherData={weather} />
      {notification && (
        <div>
          {" "}
          <ToastContainer />{" "}
        </div>
      )}
      <div className="attractions-button-container">
        <button
          onClick={() =>
            window.open(
              `${window.location.origin}/attractions?location_id=${airportData?.toData?.To_parent_id}`,
              "_blank"
            )
          }
          className="view-attractions-btn"
        >
          View Attractions
        </button>
      </div>

      {selectedHotelDetails && (
        <HotelWidget
          details={selectedHotelDetails}
          onClose={() => setSelectedHotelDetails(null)}
        />
      )}

      <div className="pageContainer">
        <div className="leftColumn">
          {isFlightLoading ? (
            <div className="spinner">
              <BounceLoader color="#36d7b7" size={90} speedMultiplier={1.5} />
            </div>
          ) : (
            flights.map((flight, index) => (
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

                  <IconSvg
                    className="bookIcon"
                    onClick={() => handleAddToCart(flight)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="rightColumn">
          {isHotelLoading ? (
            <div className="spinner">
              <BounceLoader color="#36d7b7" size={90} speedMultiplier={1.5} />
            </div>
          ) : (
            hotels.map((hotel, index) => (
              <div className="hotelCard">
                <div className="hotelInfo">
                  <div
                    className="hotelName"
                    key={index}
                    onClick={() => handleHotelClick(hotel.accomodation_id)}
                  >{`${hotel.accomodation}, ${hotel.accomodation_region}`}</div>
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
                <IconSvg
                  className="bookIcon"
                  onClick={() => handleAddHotelToCart(hotel)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchRoundTrip;
