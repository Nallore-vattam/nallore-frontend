import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { fetchImages } from "../api";
import "./GalleryPreview.css";

const GalleryPreview = () => {
  const { currentLanguage, t, setCurrentPage } = useLanguage();
  const navigate = useNavigate();

  const [previewImages, setPreviewImages] = useState([]);

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

  useEffect(() => {
    async function loadPreview() {
      const images = await fetchImages("all");
      const latest = images.slice(0, 6);
      setPreviewImages(latest);
    }
    loadPreview();
  }, []);

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

        {/* NEW CLEAN RECTANGLE MASONRY */}
        <div className="gp-masonry-wrapper">
          <div className="gp-mosaic">
            {previewImages.map((img, index) => (
              <div
                className="gp-item"
                key={index}
                onClick={() =>
                  navigate(`/gallery?category=${img.category_key}`)
                }
              >
                <img src={img.src} alt={img.title} className="gp-img" />

                <div className="gp-overlay">
                  <div className="gp-overlay-content">
                    <h6>{img.title}</h6>
                    <small>
                      {img.category_key.charAt(0).toUpperCase() +
                        img.category_key.slice(1)}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
