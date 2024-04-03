import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Attractions.scss";

const Attractions = () => {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const location_id = queryParams.get("location_id");
  console.log(location_id);
  const langauge = "en_US";

  useEffect(() => {
    const fetchAttractions = async () => {
      const response = await fetch(
        `http://localhost:5000/attraction/search-attractions`,
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
      } else {
        console.error("Failed to fetch attractions");
      }
    };

    if (location_id) {
      fetchAttractions();
    }
  }, [location_id]);

  return (
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
              <strong>Address:</strong> {selectedAttraction.attraction_address}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attractions;
