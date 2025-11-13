import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const AboutPreview = () => {
  const { currentLanguage, t, setCurrentPage } = useLanguage();
  const navigate = useNavigate();

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const handleViewMore = () => {
    setCurrentPage('about');
    navigate('/about');
  };

  return (
    <section id="about-preview" className="section about-preview-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0" >
            <img
              src="/images/Enviromental Field/enviromental01.jpg"
              alt="About Nallore Vattam"
              className="about-image img-fluid w-100 rounded-3"
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/FieldofAwareness/awareness01.jpg";
              }}
            />
          </Col>
          <Col lg={6}>
            <div className="about-preview-content">
              <h2 className={`section-title text-start ${getFontClass()}`}>
                {t('aboutTitle', 'About Nallor Vattam')}
              </h2>
              <p className={`about-text ${getFontClass()} mb-4`}>
                {t('aboutText1', 'Nallor Vattam is a vibrant community organization dedicated to social welfare, cultural preservation, and educational development. We strive to create positive change through collaborative efforts and community engagement.')}
              </p>
              <p className={`about-text ${getFontClass()} mb-4`}>
                {t('aboutText2', 'Our mission is to empower individuals and strengthen communities through various initiatives including educational programs, health camps, environmental awareness, and cultural events that celebrate our rich heritage.')}
              </p>
              <p className={`about-text ${getFontClass()} mb-4`}>
                {t('aboutText3', 'With a strong network of volunteers and community partners, we work tirelessly to address social challenges and create opportunities for growth and development across all sections of society.')}
              </p>
              
              <div className="about-highlights mb-4">
                <Row>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="feature-icon me-3">
                        <i className="bi bi-people-fill text-primary fs-3"></i>
                      </div>
                      <div>
                        <h5 className="mb-1">500+</h5>
                        <p className="text-muted mb-0">{t('membersactivecommunity','Members Active Community')} </p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="feature-icon me-3">
                        <i className="bi bi-calendar-event-fill text-primary fs-3"></i>
                      </div>
                      <div>
                        <h5 className="mb-1">50+ </h5>
                        <p className="text-muted mb-0">{t('eventsannualprograms','Events Annual Programs')}</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="feature-icon me-3">
                        <i className="bi bi-award-fill text-primary fs-3"></i>
                      </div>
                      <div>
                        <h5 className="mb-1">10+ </h5>
                        <p className="text-muted mb-0">{t('yearsofservice','Years Of Service')}</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="feature-icon me-3">
                        <i className="bi bi-heart-fill text-primary fs-3"></i>
                      </div>
                      <div>
                        <h5 className="mb-1">1000+ </h5>
                        <p className="text-muted mb-0">{t('livesimpacted','Lives Impacted')}</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="about-actions">
                <Button 
                  className="btn-about"
                  size="lg"
                  onClick={handleViewMore}
                >
                  {t('learnMoreAboutUs', 'Learn More About Us')}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutPreview;