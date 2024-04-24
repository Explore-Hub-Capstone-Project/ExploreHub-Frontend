import "../styles/home.scss";
import React, { useState, useEffect } from "react";
import Header from "../organisms/header";

function FourOhFour() {
  const images = [
    "https://images.unsplash.com/photo-1562428309-f97fc8e256e7?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531464882680-9a02c0b5818e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    images.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [url]: true }));
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextImageIndex = (currentImage + 1) % images.length;
      const nextImageUrl = images[nextImageIndex];
      if (loadedImages[nextImageUrl]) {
        setCurrentImage(nextImageIndex);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImage, loadedImages]);
  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <Header />

      <div className="hero-section">
        <div className="hero-content">
          <h1>Uh oh, you're lost!</h1>
          <h2>404</h2>
        </div>
      </div>
    </div>
  );
}

export default FourOhFour;
