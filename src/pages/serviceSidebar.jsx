// src/components/ServiceSidebar.jsx
import React from 'react';
import { Nav, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from '../components/mainjsons/Services.json';

const ServiceSidebar = ({ currentServiceKey }) => {
  const { currentLanguage, t } = useLanguage();
  const services = domainsData.domains;

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
    <div className="service-sidebar sticky-top">
      <Card className="service-sidebar-card border-0 shadow-sm">
        <Card.Header className="service-sidebar-header">
          <h6 className={`mb-0 ${getFontClass()} fw-bold`}>
            {safeTranslate('allServices', 'All Services')}
          </h6>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="service-sidebar-scroll-container">
            <Nav variant="pills" className="flex-column">
              {services.map((service, index) => (
                <Nav.Item key={service.key} className="service-sidebar-item">
                  <LinkContainer to={`/services/${service.key}`}>
                    <Nav.Link 
                      active={currentServiceKey === service.key}
                      className={`d-flex align-items-center py-3 px-3 service-sidebar-link ${getColorClass(index)}`}
                    >
                      <span className="service-sidebar-icon me-3">
                        {service.icon}
                      </span>
                      <div className="flex-grow-1">
                        <div className={`fw-bold ${getFontClass()}`}>
                          {safeTranslate(service.key, service.title)}
                        </div>
                        <small className="text-muted d-block mt-1">
                          {safeTranslate(service.description, service.description).substring(0, 50)}...
                        </small>
                      </div>
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ServiceSidebar;