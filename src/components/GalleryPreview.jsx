import React from "react";
import { Container, Button } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import "./GalleryPreview.css";

const GalleryPreview = () => {
  const { currentLanguage, t, setCurrentPage } = useLanguage();
  const navigate = useNavigate();

  const getFontClass = () => {
    switch (currentLanguage) {
      case "ta":
        return "gp-tamil-font";
      case "hi":
        return "gp-hindi-font";
      default:
        return "gp-english-font";
    }
  };

  const previewImages = [
    { src: "/images/FieldofAwareness/awareness01.jpg", category: "Cultural Events", count: "25 Photos", height: 300 },
    { src: "/images/EnviromentalField/enviromental02.jpg", category: "Community Programs", count: "18 Photos", height: 420 },
    { src: "/images/FieldofBiology/biology01.jpg", category: "Educational Activities", count: "32 Photos", height: 340 },
    { src: "/images/GovtDomain/govt01.jpg", category: "Health Camps", count: "15 Photos", height: 250 },
    { src: "/images/FieldofAwareness/awareness01.jpg", category: "Art & Exhibitions", count: "22 Photos", height: 380 },
    { src: "/images/EnviromentalField/enviromental02.jpg", category: "Youth Activities", count: "28 Photos", height: 300 },
  ];

  const handleViewGallery = () => {
    setCurrentPage("gallery");
    navigate("/gallery");
  };

  return (
    <section id="gallery-preview" className="gp-section">
      <Container>
        <div className="text-center mb-5 gp-heading-container">
          <h2 className={`gp-heading ${getFontClass()}`}>
            {t("galleryTitle", "Our Gallery")}
          </h2>
          <div className="gp-underline"></div>
          <p className={`gp-subtext ${getFontClass()}`}>
            {t(
              "galleryDescription",
              "Capturing the beauty of our community through moments that inspire and connect."
            )}
          </p>
        </div>

        <div className="gp-masonry">
          {previewImages.map((image, index) => (
            <div
              className="gp-item"
              key={index}
              style={{ height: `${image.height}px` }}
            >
              <img src={image.src} alt={image.category} className="gp-img" />
              <div className="gp-overlay">
                <div className="gp-overlay-content">
                  <h6>{image.category}</h6>
                  <small>{image.count}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Button className="gp-btn" size="lg" onClick={handleViewGallery}>
            {t("viewFullGallery", "View Full Gallery")}
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default GalleryPreview;