// src/pages/Services.jsx
import React, { useMemo } from 'react';
import { Container, Row, Col, Card, Badge, Button, Accordion, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from '../components/mainjsons/Services.json'; 
import ServiceNavigation from '../components/ServiceNavigation';
import './ServiceCards.css';

const Services = () => {
  const { currentLanguage, t, isTranslating } = useLanguage();

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

  // ✅ Better loading state with spinner
  if (isTranslating) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status" className="me-2" />
        <span className={getFontClass()}>Translating content...</span>
      </div>
    );
  }

  // Memoize processed services for better performance
  const services = useMemo(() => {
    return domainsData.domains.map((domain, index) => ({
      key: domain.key,
      icon: domain.icon, 
      title: domain.title,
      description: domain.description,
      features: domain.features || [],
      duration: domain.duration, 
      eligibility: domain.eligibility, 
    }));
  }, []);

  // Empty state handling
  if (!services || services.length === 0) {
    return (
      <div className="text-center p-5">
        <i className="bi bi-inbox fs-1 text-muted"></i>
        <h3 className={getFontClass()}>No services available</h3>
        <p className={getFontClass()}>Please check back later.</p>
      </div>
    );
  }

  // Safe translation function with fallback
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

  // Function to render features with tooltips for long text
  const renderFeatureBadge = (feature, idx) => {
    const translatedFeature = safeTranslate(feature, feature);
    
    // If feature name is long, show tooltip
    if (translatedFeature.length > 20) {
      return (
        <OverlayTrigger
          key={idx}
          placement="top"
          overlay={<Tooltip>{translatedFeature}</Tooltip>}
        >
          <Badge bg="light" text="dark" className={getFontClass()}>
            {translatedFeature.length > 25 
              ? translatedFeature.substring(0, 25) + '...' 
              : translatedFeature
            }
          </Badge>
        </OverlayTrigger>
      );
    }

    return (
      <Badge key={idx} bg="light" text="dark" className={getFontClass()}>
        {translatedFeature}
      </Badge>
    );
  };

  // Group features by category for better organization (optional)
  const groupFeaturesByCategory = (features, domainIndex) => {
    // You can customize this grouping logic based on your domain structure
    const groups = {
      primary: features.slice(0, 4),
      secondary: features.slice(4, 7),
      additional: features.slice(7, 10)
    };
    
    return Object.entries(groups)
      .filter(([_, groupFeatures]) => groupFeatures.length > 0)
      .map(([category, groupFeatures]) => ({
        category,
        features: groupFeatures
      }));
  };

  // Translated FAQs with better fallbacks
  const faqs = useMemo(() => [
    {
      question: t('faq1Question') || 'How do I apply for services?',
      answer: t('faq1Answer') || 'You can apply through our online portal or visit our office.',
    },
    {
      question: t('faq2Question') || 'What are the eligibility criteria?', 
      answer: t('faq2Answer') || 'Eligibility varies by service. Check individual service pages for details.',
    },
    {
      question: t('faq3Question') || 'How long does approval take?',
      answer: t('faq3Answer') || 'Approval typically takes 2-3 business days.',
    },
    {
      question: t('faq4Question') || 'What documents are required for registration?',
      answer: t('faq4Answer') || 'Basic identity and address proof are required for most services.',
    },
    {
      question: t('faq5Question') || 'Are these services completely free?',
      answer: t('faq5Answer') || 'Most of our community services are free of cost.',
    }
  ].filter(faq => faq.question && faq.answer), [t]);

  // Process steps data
  const processSteps = useMemo(() => [
    { 
      icon: 'bi-person-plus', 
      title: 'register', 
      desc: 'createAccount',
    },
    { 
      icon: 'bi-journal-text', 
      title: 'apply', 
      desc: 'chooseService',
    },
    { 
      icon: 'bi-search', 
      title: 'review', 
      desc: 'teamReview',
    },
    { 
      icon: 'bi-people', 
      title: 'participate', 
      desc: 'joinProgram',
    }
  ], []);

  return (
    <div className="services-page">
      {/* Modern Hero Section */}
      <section className="page-hero services-hero">
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="hero-content-box">
                <h1 className={`hero-title ${getFontClass()} fw-bold`}>
                  {safeTranslate('ourServices', 'Our Services')}
                </h1>
                <p className={`hero-subtitle ${getFontClass()}`}>
                  {safeTranslate('servicesSubtitle', 'Comprehensive community development programs designed to create lasting impact and sustainable change')}
                </p>
                </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Service Navigation */}
      <div style={{ marginTop: -50 }}>
        <ServiceNavigation />
      </div>

      {/* Services Grid Section - 2 Cards Per Row */}
      <section id="services-grid" className="section services-grid-section">
        <Container>
          <Row className="g-4">
            {services.map((service, index) => (
              <Col lg={6} key={service.key}>
                <Card className={`service-detail-card ${getColorClass(index)} h-100`}>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-start mb-3">
                      <div className="service-icon-large me-3">
                        <span>{service.icon}</span>
                      </div>
                      <div className="flex-grow-1">
                        <Card.Title className={`${getFontClass()} mb-2 fw-bold`}>
                          {safeTranslate(service.key, service.title)}
                        </Card.Title>
                        <Card.Text className={getFontClass()}>
                          {safeTranslate(service.description, service.description)}
                        </Card.Text>
                      </div>
                    </div>

                    {/* Enhanced Features Section for 10 features */}
                    {service.features.length > 0 && (
                      <div className="service-features mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className={`${getFontClass()} mb-0 fw-semibold`}>
                            {safeTranslate('keyFeatures', 'Key Initiatives')}:
                          </h6>
                          <small className="text-muted">
                            {service.features.length} {safeTranslate('features', 'features')}
                          </small>
                        </div>
                        
                        {/* Option 1: Scrollable features area */}
                        <div 
                          className="features-scrollable"
                          style={{ 
                            maxHeight: '120px', 
                            overflowY: 'auto',
                            padding: '12px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            border: '1px solid #e9ecef'
                          }}
                        >
                          <div className="d-flex flex-wrap gap-2">
                            {service.features.map((feature, idx) => renderFeatureBadge(feature, idx))}
                          </div>
                        </div>

                       
                      </div>
                    )}

                    <div className="service-meta d-flex justify-content-between text-muted small mb-3">
                      <span className={getFontClass()}>
                        <i className="bi bi-clock me-1"></i>
                        {safeTranslate('duration', 'Duration')}: {safeTranslate(service.duration, service.duration)}
                      </span>
                      <span className={getFontClass()}>
                        <i className="bi bi-person me-1"></i>
                        {safeTranslate('eligibility', 'Eligibility')}: {safeTranslate(service.eligibility, service.eligibility)}
                      </span>
                    </div>

                    <div className="service-actions">
                      <LinkContainer to={`/services/${service.key}`}>
                        <Button variant="primary" className="me-2">
                          <i className="bi bi-info-circle me-2"></i>
                          {safeTranslate('learnMoreBtn', 'Learn More')}
                        </Button>
                      </LinkContainer>
                      <Button className="btn-white-glow">
  <i className="bi bi-send me-2"></i>
  {safeTranslate('applyNow', 'Apply Now')}
</Button>

                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Process Section */}
<section className="section process-section bg-light" style={{marginTop: '10px',marginBottom:'10px'}}>
        <Container>
          <h2 className={`section-title text-center mb-5 ${getFontClass()} fw-bold`}>
            {safeTranslate('howItWorks', 'How It Works')}
          </h2>
          <Row className="text-center g-4">
            {processSteps.map((step, index) => (
              <Col lg={3} md={6} key={index}>
                <div className="process-card p-4 bg-white h-100 rounded shadow-sm position-relative">
                  <div className="process-step-number position-absolute top-0 start-50 translate-middle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold">
                  </div>
                  <div className="process-icon mb-3 text-primary mt-3">
                    <i className={`bi ${step.icon} fs-2`}></i>
                  </div>
                  <h5 className={`${getFontClass()} fw-bold`}>
                    {safeTranslate(step.title, step.title)}
                  </h5>
                  <p className={`${getFontClass()} text-muted`}>
                    {safeTranslate(step.desc, step.desc)}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="section faq-section">
          <Container>
            <h2 className={`section-title text-center mb-5 ${getFontClass()} fw-bold`}>
              {safeTranslate('frequentlyAskedQuestions', 'Frequently Asked Questions')}
            </h2>
            <Row className="justify-content-center">
              <Col lg={8}>
                <Accordion flush>
                  {faqs.map((faq, index) => (
                    <Accordion.Item 
                      eventKey={index.toString()} 
                      key={index}
                      className="mb-3 rounded shadow-sm border-0"
                    >
                      <Accordion.Header className={`${getFontClass()} fw-semibold bg-white`}>
                        <i className="bi bi-question-circle me-2 text-primary"></i>
                        {faq.question}
                      </Accordion.Header>
                      <Accordion.Body className={getFontClass() + ' bg-light'}>
                        <i className="bi bi-info-circle me-2 text-secondary"></i>
                        {faq.answer}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Row>
          </Container>
        </section>
      )}

     
    </div>
  );
};

export default Services;