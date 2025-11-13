// src/components/ServiceNavigation.jsx
import React from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from './mainjsons/Services.json';

const ServiceNavigation = ({ currentServiceKey }) => {
  const { currentLanguage, t } = useLanguage();

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
    try {
      const translated = t(key);
      return translated && translated !== key ? translated : fallback;
    } catch (error) {
      return fallback;
    }
  };

  // Function to get color class based on index
  const getColorClass = (index) => {
    const colorNumber = (index % 10) + 1;
    return `service-card-${colorNumber}`;
  };

  const services = domainsData.domains;

  return (
    <section className="service-navigation py-5" style={{ marginTop: 35 }}>
      <Container>
        
        {/* Horizontal Navigation for larger screens */}
        <div className="d-none d-lg-block">
          <Nav variant="pills" className="justify-content-center flex-wrap">
            {services.map((service, index) => (
              <Nav.Item key={service.key} className="mx-1 mb-2">
                <LinkContainer to={`/services/${service.key}`}>
                  <Nav.Link 
                    active={currentServiceKey === service.key}
                    className={`d-flex align-items-center service-nav-link ${getColorClass(index)}`}
                  >
                    <span className="me-2 service-nav-icon">
                      {service.icon}
                    </span>
                    <span className={getFontClass()}>
                      {safeTranslate(service.key, service.title)}
                    </span>
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        {/* Grid Layout for smaller screens */}
        <div className="d-lg-none">
          <Row className="g-3">
            {services.map((service, index) => (
              <Col xs={6} md={4} key={service.key}>
                <LinkContainer to={`/services/${service.key}`} style={{ cursor: 'pointer' }}>
                  <Card className={`h-100 service-nav-card text-center ${getColorClass(index)} ${currentServiceKey === service.key ? 'active' : ''}`}>
                    <Card.Body className="p-3">
                      <div className="service-nav-grid-icon mb-2">
                        {service.icon}
                      </div>
                      <Card.Title className={`small fw-bold ${getFontClass()}`}>
                        {safeTranslate(service.key, service.title)}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </LinkContainer>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ServiceNavigation;