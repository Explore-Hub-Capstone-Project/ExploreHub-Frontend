import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Attractions = () => {
  const [attractions, setAttractions] = useState([]);
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

  return <div>{/* ATtractions Here */}</div>;
};

export default Attractions;
