import React, { useState, useEffect } from "react";
import "./VerticalCarousel.css";

const VerticalCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    { image: "/images/content03.png", caption: "The Ton of Responsibilities" },
    { image: "/images/contentsofweb/kalaamquotemain.jpg", caption: "Vision of Kalaam" },
    { image: "/images/content01.png", caption: "Our Responsibilities" },
    { image: "/images/contentsofweb/domain10.jpg", caption: "Base of NV" },
    { image: "/images/content02.png", caption: "Nallore Vattam" },
    
  ];

  // Auto change every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <section className="vertical-carousel-container">
      {/* Left side thumbnails */}
      <div className="thumbnail-list">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`thumbnail-item ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
            style={{ backgroundImage: `url(${item.image})` }}
          />
        ))}
      </div>

      {/* Main display */}
      <div className="main-image-container">
        <div
          className="main-image"
          style={{ backgroundImage: `url(${carouselItems[activeIndex].image})` }}
        >
          <div className="caption-overlay">
            <h3>{carouselItems[activeIndex].caption}</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalCarousel;
