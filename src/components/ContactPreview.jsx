import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom'; // ADD THIS IMPORT

const ContactPreview = () => {
  const { currentLanguage, t, setCurrentPage } = useLanguage();
  const navigate = useNavigate(); // ADD THIS HOOK

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const contactMethods = [
    {
      icon: 'bi bi-telephone-fill',
      title: 'Phone',
      details: t('phone'),
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: 'bi bi-envelope-fill',
      title: 'Email',
      details: t('emailAddress'),
      description: 'We reply within 24 hours'
    },
    {
      icon: 'bi bi-geo-alt-fill',
      title: 'Office',
      details: t('address'),
      description: 'Visit us anytime'
    }
  ];

  const handleContactUs = () => {
    setCurrentPage('contact');
    navigate('/contact'); // ADD THIS LINE - navigates to Contact page
  };

  const handleScheduleVisit = () => {
    setCurrentPage('contact');
    navigate('/contact'); // ADD THIS LINE - navigates to Contact page
    // You could add logic to scroll to a specific section or open a modal
  };

  return (
    <section id="contact-preview" className="section contact-preview-section bg-light" style={{ marginTop: "20px" }}>
      <Container>
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h2 className={`section-title ${getFontClass()}`}>
              {t('contactTitle', 'Get In Touch')}
            </h2>
            <p id="cntpr" className={`lead ${getFontClass()}`}>
              {t('contactDescription', "Get in touch with us. We're here to help and answer any questions you might have.")}
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {contactMethods.map((method, index) => (
            <Col lg={4} md={6} key={index}>
              <Card className="contact-method-card text-center h-100 bg-light text-dark">
                <Card.Body className="p-4">
                  <div className="contact-icon mb-3">
                    <i className={`${method.icon} text-primary fs-1`}></i>
                  </div>
                  <Card.Title className={getFontClass()}>
                    {method.title}
                  </Card.Title>
                  <Card.Text className="fw-bold mb-2">
                    {method.details}
                  </Card.Text>
                  <Card.Text className={`text-muted small ${getFontClass()}`}>
                    {method.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col className="text-center">
            <Button 
              className="btn-contact" // CHANGED TO CUSTOM STYLING
              size="lg"
              onClick={handleContactUs}
            >
              {t('contactUs', 'Contact Us')}
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactPreview;