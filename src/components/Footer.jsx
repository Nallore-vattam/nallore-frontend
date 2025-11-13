import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { currentLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const getFontClass = () => {
    switch (currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const handlePageChange = (page) => {
    navigate(`/${page === 'home' ? '' : page}`);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer" style={{ marginTop: '20px' }}>
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5 className={getFontClass()}>{t('projectName')}</h5>
            <p className={getFontClass()}>{t('footerDescription')}</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h5 className={getFontClass()}>{t('quickLinks')}</h5>
            <ul className="list-unstyled">
              <li><span className={`${getFontClass()} cursor-pointer text-white`} onClick={() => handlePageChange('home')}>{t('home')}</span></li>
              <li><span className={`${getFontClass()} cursor-pointer text-white`} onClick={() => handlePageChange('about')}>{t('about')}</span></li>
              <li><span className={`${getFontClass()} cursor-pointer text-white`} onClick={() => handlePageChange('services')}>{t('services')}</span></li>
              <li><span className={`${getFontClass()} cursor-pointer text-white`} onClick={() => handlePageChange('gallery')}>{t('gallery')}</span></li>
              <li><span className={`${getFontClass()} cursor-pointer text-white`} onClick={() => handlePageChange('contact')}>{t('contact')}</span></li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h5 className={getFontClass()}>{t('services')}</h5>
            <ul className="list-unstyled">
              <li><span className={getFontClass()}>| {t('service1')} | {t('service6')} |</span></li>
              <li><span className={getFontClass()}>| {t('service2')} | {t('service7')} |</span></li>
              <li><span className={getFontClass()}>| {t('service3')} | {t('service8')} |</span></li>
              <li><span className={getFontClass()}>| {t('service4')} | {t('service9')} |</span></li>
              <li><span className={getFontClass()}>| {t('service5')} | {t('service10')}|</span></li>
            </ul>
          </Col>
              
          <Col lg={3} md={6} className="mb-4">
            <h5 className={getFontClass()}>{t('contactInfo')}</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-geo-alt me-2"></i>{t('address')}</li>
              <li><i className="bi bi-phone me-2"></i>{t('phone')}</li>
              <li><i className="bi bi-envelope me-2"></i>{t('emailAddress')}</li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row>
          <Col md={6}>
            <p className={`${getFontClass()} mb-0`}>
              &copy; {currentYear} {t('projectName')}. {t('allRightsReserved')}
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <span className={`${getFontClass()} me-3 cursor-pointer`}>
              {t('privacyPolicy')}
            </span>
            <span className={`${getFontClass()} cursor-pointer`}>
              {t('termsOfService')}
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
