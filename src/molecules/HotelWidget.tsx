import React from "react";
import "../styles/HotelWidget.scss";

type HotelDetailsProps = {
  details: {
    accomodation_name?: string;
  };
  onClose: () => void;
};

const HotelWidget: React.FC<HotelDetailsProps> = ({ details, onClose }) => {
  return (
    <div className="backdrop" onClick={onClose}>
      {" "}
      <div className="hotelDetailsPopup" onClick={(e) => e.stopPropagation()}>
        {" "}
        <div className="popupContent">
          <h2>{details.accomodation_name}</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default HotelWidget;
