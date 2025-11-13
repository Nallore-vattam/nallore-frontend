import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { currentLanguage, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setShowAlert(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setShowAlert(false), 5000);
  };

  const contactInfo = [
    {
      icon: 'bi bi-geo-alt-fill',
      title: t('ourAddress'),
      content: t('address'),
      link: '#'
    },
    {
      icon: 'bi bi-telephone-fill',
      title: t('phoneNumber'),
      content: t('phone'),
      link: `tel:${t('phone')}`
    },
    {
      icon: 'bi bi-envelope-fill',
      title: t('email'),
      content: t('emailAddress'),
      link: `mailto:${t('emailAddress')}`
    },
    {
      icon: 'bi bi-clock-fill',
      title: t('workingHours'),
      content: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: '#'
    }
  ];

  return (
    <div className="contact-page" >
      {/* Modern Hero Section */}
      <section className="page-hero contact-hero" >
        {/* Animated Background Elements */}
        <div className="floating-elements">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>

        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="hero-content-box">
                <h1 className={`hero-title ${getFontClass()}`}>
                  {t('contactTitle')}
                </h1>
                <p className={`hero-subtitle ${getFontClass()}`}>
                  {t('contactSubtitle')}
                </p>
                
                {/* Contact Info Preview */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Rest of your contact content remains the same... */}
      <section className="section contact-main-section"  style={{ marginTop: "20px" }}>
        <Container>
          <Row className="g-5">
            {/* Contact Form */}
            <Col lg={8}>
              <Card className="contact-form-card">
                <Card.Body className="p-4">
                  <h3 className={`mb-4 ${getFontClass()}`}>{t('sendMessage')}</h3>
                  
                  {showAlert && (
                    <Alert variant="success" className={getFontClass()}>
                      {t('thankYouMessage')}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className={getFontClass()}>{t('name')} *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder={t('name')}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className={getFontClass()}>{t('email')} *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder={t('email')}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className={getFontClass()}>{t('phoneNumber')}</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t('phoneNumber')}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className={getFontClass()}>{t('subject')}</Form.Label>
                          <Form.Control
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder={t('subject')}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className={getFontClass()}>{t('message')} *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder={t('message')}
                      />
                    </Form.Group>
<Button 
  className="btn-about"
  size="lg"
  type="submit"
>
  {t('send')}
</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact Information */}
            <Col lg={4}>
              <div className="contact-info-sidebar">
                <h4 className={`mb-4 ${getFontClass()}`}>{t('getInTouch')}</h4>
                
                {contactInfo.map((info, index) => (
                  <Card key={index} className="mb-3 contact-info-card">
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-start">
                        <div className="contact-icon me-3">
                          <i className={`${info.icon} text-primary fs-5`}></i>
                        </div>
                        <div>
                          <h6 className="mb-1">{info.title}</h6>
                          <p className="mb-0 text-muted">{info.content}</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}

                {/* Social Links */}
                <Card className="social-links-card">
                  <Card.Body className="p-3">
                    <h6 className={`mb-3 ${getFontClass()}`}>{t('followUs')}</h6>
                    <div className="social-links d-flex gap-3">
                      <a href="#" className="text-primary">
                        <i className="bi bi-facebook fs-4"></i>
                      </a>
                      <a href="#" className="text-primary">
                        <i className="bi bi-twitter fs-4"></i>
                      </a>
                      <a href="#" className="text-primary">
                        <i className="bi bi-instagram fs-4"></i>
                      </a>
                      <a href="#" className="text-primary">
                        <i className="bi bi-youtube fs-4"></i>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="section map-section"  style={{ marginTop: "20px" }}>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body className="p-0">
               <div
              className="map-container"
              style={{
                height: "400px",
                borderRadius: "15px",
                overflow: "hidden"
              }}
            >
              <iframe
                title="Our Location – Padmanabha Nagar, Chennai"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.414791457346!2d80.21306887505368!3d13.058704587250376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526724ddda841b%3A0x273a359acdc674c8!2sNallore%20Vattam%2C%2023%2C%20Padmanaba%20Nagar%20Main%20Rd%2C%20Padmanabha%20Nagar%2C%20Choolaimedu%2C%20Chennai%2C%20Tamil%20Nadu%20600094!5e0!3m2!1sen!2sin!4v1731411145243!5m2!1sen!2sin"
              ></iframe>


                    <div className="text-center">
                      <i className="bi bi-map text-muted" style={{ fontSize: '4rem' }}></i>
                      <h5 className="mt-3 text-muted">{t('interactiveMap')}</h5>
                      <p className="text-muted">{t('mapPlaceholder')}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;