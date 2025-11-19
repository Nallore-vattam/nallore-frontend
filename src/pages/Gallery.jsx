import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";
import { fetchCategories, fetchImages } from "../api.js";
import "./Gallery.css";

const Gallery = () => {
  const { currentLanguage, t } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getFontClass = () => {
    switch (currentLanguage) {
      case "ta": return "tamil-font";
      case "hi": return "hindi-font";
      default: return "english-font";
    }
  };

  const safeTranslate = (key, fallback) => {
    const translated = t(key);
    return translated && translated !== key ? translated : fallback;
  };

  // Build UI category labels from DB keys
  const displayCategories = useMemo(() => {
    return categories.map(c => ({
      id: c.key,
      name: safeTranslate(c.key, c.title || c.key)
    }));
  }, [categories, currentLanguage]);

  useEffect(() => {
    (async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const rows = await fetchImages(filter);
      setImages(rows);
      setSelectedImage(null);
      setCurrentImageIndex(0);
    })();
  }, [filter]);

  const filteredImages = images;

  const handleImageClick = (image) => {
    const index = filteredImages.findIndex((img) => img.id === image.id);
    setCurrentImageIndex(index);
    setSelectedImage(image);
  };

  const handleNextImage = () => {
    if (!filteredImages.length) return;
    const next = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(next);
    setSelectedImage(filteredImages[next]);
  };

  const handlePrevImage = () => {
    if (!filteredImages.length) return;
    const prev = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prev);
    setSelectedImage(filteredImages[prev]);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") setSelectedImage(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedImage, currentImageIndex, filteredImages]);

  return (
    <div className="gallery-page">
   {/* Modern Gallery Hero */}
<section className="gallery-hero-new">
  <div className="gallery-hero-inner">

    {/* LEFT TEXT */}
    <div className="gallery-hero-text slide-in-left">
      <h1 className={`gallery-hero-title ${getFontClass()}`}>
        {t("photoGallery")}
      </h1>

      <p className={`gallery-hero-subtitle ${getFontClass()}`}>
        {t("gallerySubtitle")}
      </p>

      {/* Optional Quote */}
      <p className={`gallery-hero-quote ${getFontClass()}`}>
        {t("galleryquote")}
      </p>
    </div>

    {/* RIGHT IMAGE */}
    <div className="gallery-hero-image-wrapper slide-in-right">
      <img
        src="/images/content02.png"
        alt="Gallery"
        className="gallery-hero-image"
      />
    </div>

    {/* PARTICLES */}
    <div className="gallery-hero-particles">
      <span className="p1"></span>
      <span className="p2"></span>
      <span className="p3"></span>
      <span className="p4"></span>
    </div>

  </div>
</section>

      <section className="gallery-filters-section">
        <div className="gallery-filter-container">
          {displayCategories.map((c) => (
           <button
             key={c.id}
             className={`gallery-filter-btn ${filter === c.id ? "active" : ""}`}
             onClick={() => setFilter(c.id)}
              >
            {c.id === "all" ? t("allPhotos") : c.name}
             </button>
          ))}
        </div>
      </section>

      <section className="section gallery-grid-section">
        <div className="gallery-grid-wrapper">
          <div className="gallery-grid">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item position-relative cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="gallery-img"
                  onError={(e) => { e.currentTarget.src = "/images/fallback.png"; }}
                />
                <div className="gallery-item-overlay d-flex align-items-end p-3">
                  <div className="overlay-content text-white">
                    <h6 className="mb-0">{image.title}</h6>
                    <small className="category-badge">
                      {displayCategories.find((cat) => cat.id === image.category_key)?.name}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal show={!!selectedImage} onHide={() => setSelectedImage(null)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className={`${getFontClass()} fs-6`}>
            {selectedImage?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center position-relative p-0">
          {filteredImages.length > 1 && (
            <button className="modal-nav-btn modal-prev-btn" onClick={handlePrevImage}>‹</button>
          )}
          <div className="modal-image-container p-3">
            <img
              src={selectedImage?.src}
              alt={selectedImage?.title}
              className="img-fluid rounded-3"
              style={{ maxHeight: "60vh", width: "100%", objectFit: "contain" }}
            />
          </div>
          {filteredImages.length > 1 && (
            <button className="modal-nav-btn modal-next-btn" onClick={handleNextImage}>›</button>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Gallery;
