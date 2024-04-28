import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Attractions.scss";
import Lottie from "react-lottie";
import attractionAnimation from "../styles/animations/Animation - Attraction.json";

const Attractions = () => {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const location_id = queryParams.get("location_id");
  const [isLoading, setIsLoading] = useState(true);
  console.log(location_id);
  const langauge = "en_US";

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: attractionAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const fetchAttractions = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/attraction/search-attractions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.X_RAPID_API_HOST,
          },
          body: JSON.stringify({
            location_id: location_id,
            language: langauge,
            currency: "USD",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAttractions(data);
        console.log(data);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch attractions");
      }
    };

    if (location_id) {
      fetchAttractions();
    }
  }, [location_id]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          className="lottie-animation"
          isStopped={!isLoading}
          isPaused={!isLoading}
        />
      </div>
    );
  }

  return (
    <div className="attraction-container">
      <div className="attractions-container">
        <h1 className="attractions-title">Attractions</h1>
        <div className="attractions-grid">
          {attractions.map((attraction, index) => (
            <div key={index} className="attraction-item">
              <img
                src={attraction.attraction_photos.large}
                alt={attraction.attraction_name}
                className="attraction-image"
              />
              <button
                className="attraction-name"
                onClick={() => setSelectedAttraction(attraction)}
              >
                {attraction.attraction_name}
              </button>
            </div>
          ))}
        </div>

        {selectedAttraction && (
          <div className="attraction-widget">
            <div className="widget-content">
              <span
                className="widget-close"
                onClick={() => setSelectedAttraction(null)}
              >
                ×
              </span>
              <h2>{selectedAttraction.attraction_name}</h2>

              <p>
                <strong>Rating:</strong> {selectedAttraction.attraction_rating}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedAttraction.attraction_description}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                {selectedAttraction.attraction_category.join(", ")}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {selectedAttraction.attraction_address}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attractions;
