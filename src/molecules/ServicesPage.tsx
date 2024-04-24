import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ServicesPage.scss";
import Header from "../organisms/header";
import flightSvg from "../styles/Icons/flight.svg";
import hotelSvg from "../styles/Icons/hotel.svg";
import attractionSvg from "../styles/Icons/attraction.svg";
import weatherSvg from "../styles/Icons/weather.svg";

const ServicesPage = () => {
  const navigate = useNavigate();

  const navigateToSearchFlights = () => {
    navigate("/search-flights");
  };

  return (
    <div className="main-page-container">
      <Header />
      <div className="services-page">
        <h2>ExploreHub Services</h2>
        <p className="intro">
          At ExploreHub, we specialize in creating unforgettable travel
          experiences. Our personalized service caters to all aspects of your
          travel needs, ensuring that every journey is seamless and memorable.
        </p>
        <div className="service-cards">
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-sun">
                <img src={flightSvg} alt="Flight" />
              </i>
            </div>
            <h3>Flight Tickets</h3>
            <p>
              Journey across the skies with ease as we provide you with the most
              cost-effective and convenient flight options. Our extensive
              network ensures you can reach your dream destination without
              hassle.
            </p>
            <button onClick={navigateToSearchFlights}>MORE</button>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-hiking">
                <img src={hotelSvg} alt="Hotel" />
              </i>
            </div>
            <h3>Hotel & Restaurents</h3>
            <p>
              From boutique hotels to luxury resorts, we offer accommodation
              choices that promise comfort and elegance. Dine in the finest
              restaurants with cuisines curated to tantalize your taste buds and
              enrich your travel experience.
            </p>
            <button onClick={navigateToSearchFlights}>MORE</button>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-plane">
                <img src={attractionSvg} alt="Attraction" />
              </i>
            </div>
            <h3>Best Attractions</h3>
            <p>
              Explore the must-see attractions with our curated guides. Whether
              it's the thrill of adventure parks or the tranquility of secluded
              beaches, we ensure that you experience the best each location has
              to offer.
            </p>
            <button onClick={navigateToSearchFlights}>MORE</button>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-plane">
                <img src={weatherSvg} alt="Weather" />
              </i>
            </div>
            <h3>Weather</h3>
            <p>
              We provide detailed weather reports tailored to your itinerary,
              ensuring that you're ready for whatever the skies may hold. Stay
              one step ahead and make informed decisions about your travel plans
              with up-to-date.
            </p>
            <button onClick={navigateToSearchFlights}>MORE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
