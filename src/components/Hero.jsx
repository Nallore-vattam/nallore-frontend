import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { FaWpforms } from "react-icons/fa"; 


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { currentLanguage, t, changePage } = useLanguage();
  const navigate = useNavigate();
  
  const slides = [
    {
      title: t('heroTitle1'),
      subtitle: t('heroSubtitle1'),
      background: '/images/FieldofAwareness/awareness01.jpg'
    },
    {
      title: t('heroTitle2'),
      subtitle: t('heroSubtitle2'),
      background: '/images/SettingsDomain/settings01.jpg'
    },
    {
      title: t('heroTitle3'),
      subtitle: t('heroSubtitle3'),
      background: '/images/WorldDomain/world01.jpg'
    }
  ];

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Keyboard event listener for arrow keys
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if we're in the hero section or its children
      const heroSection = document.getElementById('home');
      if (!heroSection) return;

      const isInHeroSection = heroSection.contains(document.activeElement) || 
                             document.activeElement === document.body;

      if (isInHeroSection) {
        switch(event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            prevSlide();
            break;
          case 'ArrowRight':
            event.preventDefault();
            nextSlide();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Click event handlers for left/right sides
  const handleLeftClick = () => {
    prevSlide();
  };

  const handleRightClick = () => {
    nextSlide();
  };

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const navigateToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (changePage) {
        changePage('about');
      } else {
        navigate('/about');
      }
    }
  };

  const navigateToContact = () => {
    if (changePage) {
      changePage('contact');
    } else {
      navigate('/contact');
    }
    
    if (!changePage && !navigate) {
      window.location.href = '/contact';
    }
  };

  return (
    <section 
      id="home" 
      className="home-hero-section"
    >
      {/* Background Image */}
      <div 
        className="hero-background"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 27, 75, 0.65), rgba(55, 48, 163, 0.55)), url(${slides[currentSlide].background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Clickable Left Side */}
      <div 
        className="hero-click-area left-click-area"
        onClick={handleLeftClick}
        title="Previous slide"
      />

      {/* Clickable Right Side */}
      <div 
        className="hero-click-area right-click-area"
        onClick={handleRightClick}
        title="Next slide"
      />

      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* HERO CONTAINER */}
      <Container 
        className="hero-container d-flex align-items-center justify-content-center"
      >
        <Row className="justify-content-center align-items-center text-center w-100">
          <Col lg={10} xl={8} md={12} sm={12} xs={12}>
            <div className="hero-content">
              {/* Hero Title */}
              <h1 className={`hero-title mb-3 ${getFontClass()}`}>
                {slides[currentSlide].title}
              </h1>
              
              {/* Hero Subtitle */}
              <p className={`hero-subtitle mb-4 ${getFontClass()}`}>
                {slides[currentSlide].subtitle}
              </p>
              
              {/* Hero Buttons */}
              <div className="hero-buttons d-flex justify-content-center flex-wrap">
                <Button 
                  size="lg" 
                  className="cta-button me-2 me-md-3 mb-2 mb-md-0"
                  onClick={navigateToAbout}
                >
                  {t('learnMore')}
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  className="secondary-button mb-2 mb-md-0 d-flex align-items-center gap-2"
                  onClick={navigateToContact}
                ><FaWpforms size={20} />
                  {t('getInvolved')}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Slide Indicators */}
        <div className="slide-indicators position-absolute start-50 translate-middle-x">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </Container>

      <style>{`
        .home-hero-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          height: 70vh;
          min-height: 400px;
          background: transparent;
          cursor: default; /* Default cursor for entire section */
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        /* Clickable areas for left/right navigation */
        .hero-click-area {
          position: absolute;
          top: 0;
          height: 100%;
          width: 25%; /* Adjust width as needed */
          z-index: 4; /* Above content but below indicators */
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .left-click-area {
          left: 0;
        }

        .right-click-area {
          right: 0;
        }

        /* Hover effects for clickable areas */
        .hero-click-area:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .left-click-area:hover::before {
          content: '‹';
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          font-size: 3rem;
          font-weight: bold;
          opacity: 0.7;
        }

        .right-click-area:hover::after {
          content: '›';
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          font-size: 3rem;
          font-weight: bold;
          opacity: 0.7;
        }

        .hero-container {
          position: relative;
          z-index: 3;
          height: 100%;
          min-height: 400px;
          padding: 0 15px;
        }

        .hero-content {
          text-align: center;
          padding: 0 10px;
        }

        /* COMPLETELY CLEAN TYPOGRAPHY - NO SHADOWS */
        .hero-title {
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          font-size: clamp(1.7rem, 5.5vw, 3.5rem) !important;
          line-height: 1.1;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
          margin-bottom: 1rem !important;
          text-shadow: none !important;
        }

        .hero-subtitle {
          text-align: center;
          margin-left: auto;
          margin-right: auto;
          max-width: 650px;
          font-size: clamp(0.95rem, 2.7vw, 1.4rem) !important;
          line-height: 1.6;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.95);
          opacity: 0.9;
          text-shadow: none !important;
        }

        /* Language-specific font styling */
        .tamil-font.hero-title {
          font-weight: 700;
          letter-spacing: 0px;
          line-height: 1.3;
          text-shadow: none !important;
        }

        .hindi-font.hero-title {
          font-weight: 700;
          letter-spacing: 0px;
          line-height: 1.3;
          text-shadow: none !important;
        }

        .tamil-font.hero-subtitle,
        .hindi-font.hero-subtitle {
          line-height: 1.7;
          opacity: 0.95;
          text-shadow: none !important;
        }

        /* Hero Buttons - Clean Style */
        .hero-buttons {
          text-align: center;
          gap: 12px;
        }

        .cta-button,
        .secondary-button {
          font-size: 0.95rem !important;
          padding: 0.7rem 1.5rem !important;
          border-radius: 22px;
          font-weight: 600;
          transition: all 0.3s ease;
          min-width: 140px;
          border: 2px solid transparent;
          text-shadow: none !important;
        }

        .cta-button {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
          border-color: #8b5cf6;
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
        }

        .secondary-button {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border-color: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
        }

        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
        }

        /* Slide Indicators */
        .slide-indicators {
          display: flex;
          gap: 10px;
          bottom: 25px;
          z-index: 10;
        }

        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.6);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: white;
          border-color: white;
          transform: scale(1.2);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .home-hero-section {
            height: 60vh;
            min-height: 350px;
          }

          .hero-container {
            min-height: 350px;
          }
          
          .hero-title {
            font-size: clamp(1.5rem, 5vw, 2.5rem) !important;
            margin-bottom: 0.8rem !important;
          }
          
          .hero-subtitle {
            font-size: clamp(0.85rem, 2.5vw, 1.1rem) !important;
            margin-bottom: 1.5rem !important;
          }
          
          .slide-indicators {
            bottom: 20px;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }
          
          .hero-buttons .btn {
            width: 150px;
            margin: 0 !important;
            padding: 0.6rem 1.3rem !important;
            font-size: 0.9rem !important;
          }

          /* Make click areas smaller on mobile */
          .hero-click-area {
            width: 20%;
          }
        }

        @media (max-width: 576px) {
          .home-hero-section {
            height: 55vh;
            min-height: 320px;
          }

          .hero-container {
            min-height: 320px;
          }
          
          .hero-title {
            font-size: clamp(1.3rem, 5.5vw, 2rem) !important;
            letter-spacing: -0.3px;
          }
          
          .hero-subtitle {
            font-size: clamp(0.8rem, 3vw, 1rem) !important;
          }
          
          .cta-button,
          .secondary-button {
            min-width: 130px;
            padding: 0.5rem 1.1rem !important;
            font-size: 0.85rem !important;
          }

          /* Hide hover arrows on very small screens */
          .hero-click-area:hover::before,
          .hero-click-area:hover::after {
            display: none;
          }
        }

        /* LARGE SCREENS */
        @media (min-width: 992px) {
          .home-hero-section {
            height: 85vh;
            min-height: 600px;
          }

          .hero-container {
            min-height: 600px;
          }

          .hero-title {
            font-size: clamp(2.2rem, 5vw, 4rem) !important;
            letter-spacing: -0.8px;
          }

          .hero-subtitle {
            font-size: clamp(1.1rem, 2.5vw, 1.6rem) !important;
            max-width: 750px;
          }
        }

        /* DESKTOP */
        @media (min-width: 1200px) {
          .home-hero-section {
            height: 90vh;
            min-height: 650px;
          }
          
          .hero-container {
            min-height: 650px;
          }
        }

        /* Global text shadow removal */
        .home-hero-section * {
          text-shadow: none !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;