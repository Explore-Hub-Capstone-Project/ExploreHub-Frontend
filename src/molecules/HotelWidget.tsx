import React, { useState, useEffect } from "react";
import "../styles/HotelWidget.scss";

type Photo = {
  maxHeight: number;
  maxWidth: number;
  urlTemplate: string;
};

type Restaurant = {
  restaurant_name: string;
  bubbleRating: {
    rating: number;
    numberReviews: string;
  };
  restauranttype?: string;
  distance: string;
};

type HotelDetailsProps = {
  details: {
    accomodation_name?: string;
    photos?: Photo[];
    rating?: number;
    numberReviews?: number;
    rankingDetails?: string;
    restaurantsNearby?: Restaurant[];
  };
  onClose: () => void;
};

const renderStars = (rating: number) => {
  return [...Array(5)].map((_, index) => (
    <span key={index} className={index < rating ? "star filled" : "star"}>
      ★
    </span>
  ));
};

const HotelWidget: React.FC<HotelDetailsProps> = ({ details, onClose }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhotoIndex((currentPhotoIndex) =>
        currentPhotoIndex + 1 === details.photos?.length
          ? 0
          : currentPhotoIndex + 1
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [details.photos, currentPhotoIndex]);

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="hotelDetailsPopup" onClick={(e) => e.stopPropagation()}>
        <div className="popupContent">
          <h2>{details.accomodation_name}</h2>
          <p>
            Rating: {details.rating} ({details.numberReviews} reviews)
          </p>
          <p
            dangerouslySetInnerHTML={{ __html: details.rankingDetails || "" }}
          ></p>
          <div className="photoContainer">
            {details.photos?.map((photo, index) => (
              <img
                key={index}
                src={photo.urlTemplate
                  .replace("{width}", "500")
                  .replace("{height}", "300")}
                alt="Hotel"
                className={`slide ${index === currentPhotoIndex ? "active" : ""}`}
                style={{ maxWidth: "100%", height: "400px" }}
              />
            ))}
          </div>
          <div className="nearbyRestaurants">
            <h3>Nearby Restaurants:</h3>
            <div className="restaurantsGrid">
              {details.restaurantsNearby
                ?.slice(0, 4)
                .map((restaurant, index) => (
                  <div key={index} className="restaurant">
                    <p className="restaurantName">
                      {restaurant.restaurant_name}
                    </p>
                    <div className="rating">
                      {renderStars(restaurant.bubbleRating.rating)}
                    </div>
                    <p className="restaurantType">
                      {restaurant.restauranttype}
                    </p>
                    <p className="distance">{restaurant.distance} away</p>
                  </div>
                ))}
            </div>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default HotelWidget;
