import React, { useEffect, useState } from "react";
import "../styles/Profile.scss";
import dummyProfilePic from "../styles/images/profilepicture.jpg";
import Header from "../organisms/header";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:5000/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const profile = await response.json();
            setUserProfile(profile);
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
                    <strong>Name:</strong> {userProfile["firstname"] || null}{" "}
                    {userProfile["lastname"] || null}
                  </p>
                  <p>
                    <strong>Username:</strong> {userProfile["username"] || null}
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
          <div>Saved Trips here</div>
        </div>
        <div>Paid bookings here</div>
      </div>
    </div>
  );
};

export default Profile;
