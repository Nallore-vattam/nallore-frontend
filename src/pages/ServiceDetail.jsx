// src/pages/ServiceDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Card, Spinner } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import ServicePagination from '../components/ServicePagination';
import ServiceNavigation from '../components/ServiceNavigation';
import domainsData from '../components/mainjsons/Services.json';
import ServiceSidebar from './serviceSidebar';

import './ServiceCards.css';

const ServiceDetail = () => {
  const { serviceKey } = useParams();
  const navigate = useNavigate();
  const { currentLanguage, t, isTranslating } = useLanguage();
  
  const service = domainsData.domains.find(s => s.key === serviceKey);
  const serviceIndex = domainsData.domains.findIndex(s => s.key === serviceKey);
  
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

  // Redirect to main services page if service not found
  React.useEffect(() => {
    if (!service && !isTranslating) {
      navigate('/services');
    }
  }, [service, navigate, isTranslating]);

  if (isTranslating) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status" className="me-2" />
        <span className={getFontClass()}>Translating content...</span>
      </div>
    );
  }

  if (!service) {
    return (
      <Container className="text-center py-5">
        <h2 className={getFontClass()}>Service not found</h2>
        <Button onClick={() => navigate('/services')} variant="primary">
          Back to Services
        </Button>
      </Container>
    );
  }

  const safeTranslate = (key, fallback = '') => {
    const translated = t(key);
    return translated && translated !== key ? translated : fallback;
  };

  const getColorClass = (index) => {
    const colorNumber = (index % 10) + 1;
    return `service-card-${colorNumber}`;
  };

  const currentColorClass = getColorClass(serviceIndex);

  return (
    <div className="service-detail-page">
      {/* Service Navigation */}
      <ServiceNavigation currentServiceKey={serviceKey} />

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col lg={3} className="d-none d-lg-block">
            <ServiceSidebar currentServiceKey={serviceKey} />
          </Col>
          
          {/* Main Content */}
          <Col lg={9}>
            <div className="service-content p-4">
              {/* Header */}
              <Card className={`service-detail-header ${currentColorClass} mb-5 border-0`}>
                <Card.Body className="text-center p-5">
                  <div className="service-detail-icon mb-4">
                    {service.icon}
                  </div>
                  <h1 className={`display-5 fw-bold ${getFontClass()} mb-3`}>
                    {safeTranslate(service.key, service.title)}
                  </h1>
                  <p className={`lead ${getFontClass()} mb-4`}>
                    {safeTranslate(service.description, service.description)}
                  </p>
                </Card.Body>
              </Card>

              {/* Features Section */}
              {service.features.length > 0 && (
                <Row className="mb-5">
                  <Col>
                    <h2 className={`mb-4 ${getFontClass()} fw-bold`}>
                      <i className="bi bi-stars me-2"></i>
                      {safeTranslate('keyFeatures', 'Key Features')}
                    </h2>
                    <Row>
                      {service.features.map((feature, index) => (
                        <Col lg={6} key={index} className="mb-3">
                          <Card className={`h-100 border-0 shadow-sm feature-card ${currentColorClass}`}>
                            <Card.Body className="d-flex align-items-center">
                              <div className="feature-icon me-3">
                                <i className="bi bi-check-circle-fill fs-4"></i>
                              </div>
                              <div>
                                <h6 className={`mb-1 fw-bold ${getFontClass()}`}>
                                  {safeTranslate(feature, feature)}
                                </h6>
                                <small className="text-muted">
                                  {safeTranslate(`${feature}Desc`, 'Comprehensive support and guidance')}
                                </small>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              )}


              {/* Action Buttons */}
              <Row className="mb-5">
                <Col className="text-center">
                  <Button variant="primary" size="lg" className={`me-3 px-4 py-2 service-action-btn ${currentColorClass}`}>
                    <i className="bi bi-pencil me-2"></i>
                    {safeTranslate('applyNow', 'Apply Now')}
                  </Button>
                  <Button variant="outline-secondary" size="lg" className="px-4 py-2" onClick={() => navigate('/services')} style={{marginTop:'10px'}}>
                    <i className="bi bi-arrow-left me-2"></i>
                    {safeTranslate('backToServices', 'Back to Services')}
                  </Button>
                </Col>
              </Row>

              {/* Navigation between services */}
              <ServicePagination currentServiceKey={serviceKey} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ServiceDetail;