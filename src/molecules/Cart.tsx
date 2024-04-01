import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../molecules/CartContext";
import Header from "../organisms/header";
import "../styles/cart.scss";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [flightDetails, setFlightDetails] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFlightDetails = localStorage.getItem("flightDetails");
    if (storedFlightDetails) {
      setFlightDetails(JSON.parse(storedFlightDetails));
    }
    const storedHotelDetails = localStorage.getItem("hotelDetails");
    if (storedHotelDetails) {
      setHotelDetails(JSON.parse(storedHotelDetails));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(flightDetails);
    console.log(hotelDetails);
  }, [flightDetails, hotelDetails]);

  const calculateNightsAndDays = (
    departureDate: string,
    returnDate: string
  ) => {
    if (
      flightDetails &&
      flightDetails.departureDate &&
      flightDetails.returnDate
    ) {
      const departure = new Date(flightDetails.departureDate);
      const returnD = new Date(flightDetails.returnDate);

      const difference = returnD.getTime() - departure.getTime();
      const nights = difference / (1000 * 3600 * 24);
      const days = nights + 1;

      return `${nights} Nights, ${days} Days`;
    }
  };

  const calculateTotal = () => {
    let flightsSubtotal = cartItems
      .filter((item) => item.outbound)
      .reduce((acc, flight) => acc + flight.price, 0);

    let hotelsSubtotal = cartItems
      .filter((item) => item.accomodation)
      .reduce((acc, accomodation) => {
        const price =
          typeof accomodation.priceForDisplay === "string"
            ? parseFloat(accomodation.priceForDisplay.replace("$", ""))
            : accomodation.priceForDisplay;
        return acc + price;
      }, 0);

    let tax = (flightsSubtotal + hotelsSubtotal) * 0.18;
    return {
      flightsSubtotal: flightsSubtotal,
      hotelsSubtotal: hotelsSubtotal,
      subtotal: flightsSubtotal + hotelsSubtotal,
      tax: tax,
      total: flightsSubtotal + hotelsSubtotal + tax,
    };
  };

  const { flightsSubtotal, hotelsSubtotal, tax } = calculateTotal();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSaveButton = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    const userId = token;
    const userEmail = email;

    const transformCartItems = (cartItems) => {
      return cartItems.map((item) => {
        if (item.outbound && item.return_flight) {
          return {
            outbound: item.outbound,
            return_flight: item.return_flight,
            price: item.price,
          };
        } else if (item.hotel) {
          return {
            hotel: {
              accomodation_id: item.hotel.accomodation_id,
              accomodation: item.hotel.accomodation,
              breakfast_info: item.hotel.breakfast_info,
              accomodation_region: item.hotel.accomodation_region,
              accomodation_rating: {
                count: item.hotel.accomodation_rating.count,
                rating: item.hotel.accomodation_rating.rating,
              },
              accomodation_provider: item.hotel.accomodation_provider,
              priceForDisplay: item.hotel.priceForDisplay
                ? item.hotel.priceForDisplay
                : "N/A",
              strikethroughPrice: item.hotel.strikethroughPrice,
              priceDetails: item.hotel.priceDetails,
              accomodation_photos: item.hotel.accomodation_photos.map(
                (photo) => ({
                  url: photo.sizes.urlTemplate
                    .replace("{width}", photo.sizes.maxWidth.toString())
                    .replace("{height}", photo.sizes.maxHeight.toString()),
                  maxWidth: photo.sizes.maxWidth,
                  maxHeight: photo.sizes.maxHeight,
                })
              ),
            },
          };
        } else {
          return item;
        }
      });
    };

    const cartData = {
      userEmail,
      cartItems: transformCartItems(cartItems),
    };

    // console.log(cartData);
    // console.log(JSON.stringify(cartData));

    try {
      const response = await fetch(
        "http://localhost:5000/user/add_save_trip/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(cartData),
        }
      );
      console.log(cartData);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Save successful:", data);
    } catch (error) {
      console.error("Error saving cart:", error);
    }
    return cartData;
  };

  const handleRemoveButton = (cartItems) => {
    removeFromCart(cartItems);
    console.log(cartItems);
    window.location.reload();
  };

  const handlePlanYourTripButton = () => {
    navigate("/search-flights/");
  };

  const handleCheckoutButton = async () => {
    console.log("Checkout Pressed");
  };

  return (
    <div className="main-page-container">
      <Header />
      <div className="cart-container">
        <div className="details-column">
          <div className="details-card">
            <h2>Flight Details</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems
                .filter((item) => item.outbound)
                .map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="flight-section">
                      <h3>Outbound Flight </h3>
                      <div className="flight-info">
                        <div className="airline-display">
                          <img
                            src={item.outbound["Airline Logo"]}
                            alt={`${item.outbound["Airline Name"]} Logo`}
                            className="airline-logo"
                          />
                          <div className="airline-details">
                            <p>{item.outbound["Airline Name"]}</p>
                            <p>
                              {item.outbound["Departure Time"]} -{" "}
                              {item.outbound["Arrival Time"]}
                            </p>
                            <p>
                              {flightDetails.from || "City"} (
                              {item.outbound["Source City Code"] || "XXX"}) →{" "}
                              {flightDetails.to || "City"} (
                              {item.outbound["Destination City Code"] || "XXX"})
                            </p>
                          </div>
                        </div>

                        <p>Duration: {item.outbound["Duration"]}</p>
                        <p>
                          Number of Stops: {item.outbound["Number of Stops"]}
                        </p>
                      </div>
                    </div>
                    {item.return && (
                      <div className="flight-section">
                        <h3>Return Flight</h3>
                        <div className="flight-info">
                          <div className="airline-display">
                            <img
                              src={item.return["Airline Logo"]}
                              alt={`${item.return["Airline Name"]} Logo`}
                              className="airline-logo"
                            />
                            <div className="airline-details">
                              <p>{item.return["Airline Name"]}</p>
                              <p>
                                {item.return["Departure Time"]} -{" "}
                                {item.return["Arrival Time"]}
                              </p>
                              <p>
                                {flightDetails.to || "City"} (
                                {item.return["Source City Code"] || "XXX"}) →{" "}
                                {flightDetails.from || "City"} (
                                {item.return["Destination City Code"] || "XXX"})
                              </p>
                            </div>
                          </div>
                          <p>Duration: {item.return["Duration"]}</p>
                          <p>
                            Number of Stops: {item.return["Number of Stops"]}
                          </p>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))
            )}
            <div>
              <h2>Hotel Details</h2>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cartItems
                  .filter((item) => item.accomodation)
                  .map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="hotel-info">
                        <div className="hotel-title">{item.accomodation}</div>
                        <p> {item["SecondaryInfo"]} </p>
                        <p>
                          CheckIn {flightDetails.departureDate} - CheckOut{" "}
                          {flightDetails.returnDate}
                        </p>
                        <p>
                          {calculateNightsAndDays(
                            flightDetails.departureDate,
                            flightDetails.returnDate
                          )}
                        </p>
                        <p>Number of adults: {flightDetails.travellers}</p>
                      </div>
                    </React.Fragment>
                  ))
              )}
            </div>
            {cartItems.length > 0 && (
              <button
                className="later-button"
                onClick={() => handleRemoveButton(cartItems)}
              >
                Remove from Cart
              </button>
            )}
          </div>
        </div>

        <div className="summary-column">
          <div className="summary-card">
            <h2>Total</h2>
            <div className="price-section">
              <span className="price-text">Price for Flights</span>
              <span className="price">$ {flightsSubtotal.toFixed(2)}</span>
            </div>
            <div className="price-section">
              <span className="price-text">Price for Hotel</span>
              <span className="price">$ {hotelsSubtotal.toFixed(2)}</span>{" "}
            </div>
            <div className="price-section tax">
              <span className="price-text">Tax 18%</span>
              <span className="price">$ {tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="price-section total">
              <h3>Grand Total</h3>
              <span className="price">
                $ {(flightsSubtotal + hotelsSubtotal + tax).toFixed(2)}
              </span>
            </div>
            {cartItems.length > 0 ? (
              <>
                <button
                  onClick={() => handleCheckoutButton()}
                  className="checkout-button"
                >
                  Checkout
                </button>
                <button
                  onClick={() => handleSaveButton()}
                  className="later-button"
                >
                  Save For Later
                </button>
              </>
            ) : (
              <button
                onClick={() => handlePlanYourTripButton()}
                className="later-button"
              >
                Plan Your Trip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
