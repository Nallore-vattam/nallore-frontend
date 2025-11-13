// src/components/ServicePagination.jsx
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from './mainjsons/Services.json';

const ServicePagination = ({ currentServiceKey }) => {
  const { currentLanguage, t } = useLanguage();
  const services = domainsData.domains;
  const currentIndex = services.findIndex(service => service.key === currentServiceKey);
  
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  // Safe getFontClass function
  const getFontClass = () => {
    switch (currentLanguage) {
      case 'ta':
        return 'tamil-font';
      case 'hi':
        return 'hindi-font';
      default:
        return 'english-font';
    }
  };

  const safeTranslate = (key, fallback = '') => {
    const translated = t(key);
    return translated && translated !== key ? translated : fallback;
  };

  // Function to get color class based on index
  const getColorClass = (index) => {
    const colorNumber = (index % 10) + 1;
    return `service-card-${colorNumber}`;
  };

  return (
    <Row className="service-pagination mt-5">
      <Col md={6}>
        {prevService && (
          <LinkContainer to={`/services/${prevService.key}`}>
            <Button variant="outline-light" className={`w-100 text-start p-3 service-pagination-btn ${getColorClass(currentIndex - 1)}`}>
              <div className="d-flex align-items-center">
                <i className="bi bi-chevron-left me-3 fs-4"></i>
                <div>
                  <small className="text-muted d-block">
                    {safeTranslate('previousService', 'Previous Service')}
                  </small>
                  <div className={`fw-bold ${getFontClass()}`}>
                    {safeTranslate(prevService.key, prevService.title)}
                  </div>
                  <small className="text-muted">
                    <span className="me-2">{prevService.icon}</span>
                    {safeTranslate(prevService.description, prevService.description).substring(0, 60)}...
                  </small>
                </div>
              </div>
            </Button>
          </LinkContainer>
        )}
      </Col>
      <Col md={6}>
        {nextService && (
          <LinkContainer to={`/services/${nextService.key}`}>
            <Button variant="outline-primary" className={`w-100 text-end p-3 service-pagination-btn ${getColorClass(currentIndex + 1)}`}>
              <div className="d-flex align-items-center justify-content-end">
                <div>
                  <small className="text-muted d-block">
                    {safeTranslate('nextService', 'Next Service')}
                  </small>
                  <div className={`fw-bold ${getFontClass()}`}>
                    {safeTranslate(nextService.key, nextService.title)}
                  </div>
                  <small className="text-muted">
                    <span className="me-2">{nextService.icon}</span>
                    {safeTranslate(nextService.description, nextService.description).substring(0, 60)}...
                  </small>
                </div>
                <i className="bi bi-chevron-right ms-3 fs-4"></i>
              </div>
            </Button>
          </LinkContainer>
        )}
      </Col>
    </Row>
  );
};

export default ServicePagination;