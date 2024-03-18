import { useLocation } from "react-router-dom";
import "../styles/WeatherWidget.scss";

const WeatherWidget = ({ weatherData }) => {
  const location = useLocation();
  const { to } = location.state || {};

  if (!weatherData || weatherData.length === 0) {
    return <div>No weather data available</div>;
  }

  const { Temperature, Description, Feels, Humidity } = weatherData[0];

  const tempFahrenheit = (((Temperature - 273.15) * 9) / 5 + 32).toFixed(1);
  const feelsLikeFahrenheit = (((Feels - 273.15) * 9) / 5 + 32).toFixed(1);

  return (
    <div className="weather-widget">
      <div className="weather-header">Weather in {to}</div>
      <div className="weather-content">
        <div className="weather-column">
          <div className="weather-row">
            <span className="weather-label">Temperature:</span>
            <span className="weather-value">{tempFahrenheit}°C</span>
          </div>
          <div className="weather-row">
            <span className="weather-label">Description:</span>
            <span className="weather-value">{Description}</span>
          </div>
        </div>
        <div className="weather-column">
          <div className="weather-row">
            <span className="weather-label">Feels Like:</span>
            <span className="weather-value">{feelsLikeFahrenheit}°C</span>
          </div>
          <div className="weather-row">
            <span className="weather-label">Humidity:</span>
            <span className="weather-value">{Humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
