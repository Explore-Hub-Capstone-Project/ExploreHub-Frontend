import React, { useEffect, useState } from "react";
import Header from "./header";
import "../styles/Profile.scss";
import dummyProfilePic from "../styles/Icons/profilepicture.jpg";
import { profile } from "console";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [savedBookings, setSavedBookings] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + "/user/me/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const profile = await response.json();
            setUserProfile(profile);
            fetchSavedBookings(token);
            console.log(profile.email);
            return profile.email;
          } else {
            console.error("Failed to fetch profile");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const fetchSavedBookings = async (token) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/user/get_saved_trips/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const bookingsData = await response.json();
        setSavedBookings(bookingsData.trips);
        console.log("Saved Search", bookingsData);
      } else {
        console.error("Failed to fetch bookings: Status", response.status);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "filled" : ""}>
          ★
        </span>
      );
    }
    return <div className="star-rating">{stars}</div>;
  };

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-bookings-container">
        <div className="loginpage">
          <div className="profile-column">
            <div className="profile-card">
              <img
                src={dummyProfilePic}
                alt="Profile"
                className="profile-pic"
              />
              <h2>Profile Information</h2>
              {userProfile ? (
                <div>
                  <p>
                    <strong>Name:</strong> {userProfile["firstname"] || ""}{" "}
                    {userProfile["lastname"] || ""}
                  </p>
                  <p>
                    <strong>Username:</strong> {userProfile["username"] || ""}
                  </p>
                  <p>
                    <strong>Email:</strong> {userProfile["email"] || null}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userProfile["mobile"] || null}
                  </p>
                  <p>
                    <strong>Country:</strong> {userProfile["country"] || null}
                  </p>
                </div>
              ) : (
                <p>Loadin Profile....</p>
              )}
            </div>
          </div>
          <div>
            <div className="bookings-column">
              <div className="trip-details">
                <h2>Saved Searches</h2>
                {savedBookings.map((booking, bookingIndex) => (
                  <div key={booking._id}>
                    {booking.cartItems.map((item, itemIndex) => (
                      <>
                        {item.outbound && (
                          <div className="flight-info">
                            <img
                              src={item.outbound["Airline Logo"] || null}
                              alt="Flight Logo"
                            />

                            <div className="flight-time">
                              <span>
                                {item.outbound["Departure Time"]} -{" "}
                                {item.outbound["Arrival Time"]}
                              </span>
                              <span style={{ marginLeft: "50px" }}>
                                {item.outbound["Source City Code"]} -{" "}
                                {item.outbound["Destination City Code"]}
                              </span>
                            </div>

                            <div>
                              <span style={{ marginLeft: "90px" }}>
                                {" "}
                                {item.outbound["Flight Number"]} -{" "}
                                {item.outbound["Airline Name"]}
                              </span>
                              <span style={{ marginLeft: "50px" }}>
                                {item.outbound["Duration"]}
                              </span>
                            </div>
                          </div>
                        )}
                        {item.return && (
                          <div className="flight-info">
                            <img
                              src={item.return["Airline Logo"] || null}
                              alt="Flight Logo"
                            />
                            <div className="flight-time">
                              <span>
                                {item.return["Departure Time"]} -{" "}
                                {item.return["Arrival Time"]}
                              </span>
                              <span style={{ marginLeft: "50px" }}>
                                {item.return["Source City Code"]} -{" "}
                                {item.return["Destination City Code"]}
                              </span>
                            </div>
                            <div>
                              <span style={{ marginLeft: "90px" }}>
                                {item.return["Flight Number"]} -{" "}
                                {item.return["Airline Name"]}
                              </span>

                              <span style={{ marginLeft: "50px" }}>
                                {item.return["Duration"]}
                              </span>
                            </div>
                          </div>
                        )}
                        {item.accomodation && (
                          <div className="hotel-info">
                            {" "}
                            <div className="hotel-title">
                              {item.accomodation}{" "}
                            </div>
                            <div className="hotel-secondaryInfo">
                              {item.accomodation_region}
                            </div>
                            <div>{renderStars(item.accomodation_rating)}</div>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
