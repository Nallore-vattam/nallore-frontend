import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import "../App.css"; 

// 🔵 USE SAME API_BASE SYSTEM LIKE OTHER PAGES
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔵 USE API_BASE HERE
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowAlert(true);

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setTimeout(() => setShowAlert(false), 4000);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error!");
    }
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
    <div className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero-new">
        <div className="contact-hero-inner">

          <div className="contact-hero-image-wrapper slide-in-left">
            <img src="/images/content02.png" alt="Contact Us" className="contact-hero-image" />
          </div>

          <div className="contact-hero-text slide-in-right">
            <h1 className={`contact-hero-title ${getFontClass()}`}>{t('contactTitle')}</h1>
            <p className={`contact-hero-subtitle ${getFontClass()}`}>{t('contactSubtitle')}</p>
            <p className={`contact-hero-quote ${getFontClass()}`}>{t("contactquote")}</p>
          </div>

          <div className="contact-hero-particles">
            <span className="p1"></span>
            <span className="p2"></span>
            <span className="p3"></span>
            <span className="p4"></span>
          </div>

        </div>
      </section>

      {/* Main Section */}
      <section className="section contact-main-section" style={{ marginTop: "20px" }}>
        <Container>
          <Row className="g-5">
            
            {/* LEFT: FORM */}
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

                    <Button className="btn-about" size="lg" type="submit">
                      {t('send')}
                    </Button>
                  </Form>

                </Card.Body>
              </Card>
            </Col>

            {/* RIGHT: INFO */}
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

                {/* Social Icons */}
                <Card className="social-links-card">
                  <Card.Body className="p-3">
                    <h6 className={`mb-3 ${getFontClass()}`}>{t('followUs')}</h6>
                    <div className="social-links d-flex gap-3">
                      <i className="bi bi-facebook fs-4 text-primary"></i>
                      <i className="bi bi-twitter fs-4 text-primary"></i>
                      <i className="bi bi-instagram fs-4 text-primary"></i>
                      <i className="bi bi-youtube fs-4 text-primary"></i>
                    </div>
                  </Card.Body>
                </Card>

              </div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* Map */}
      <section className="section map-section" style={{ marginTop: "20px" }}>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body className="p-0">
                  <div className="map-container" style={{ height: "400px", borderRadius: "15px", overflow: "hidden" }}>
                    <iframe
                      title="Our Location – Padmanabha Nagar, Chennai"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.414791457346!2d80.21306887505368!3d13.058704587250376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526724ddda841b%3A0x273a359acdc674c8!2sNallore%20Vattam!5e0!3m2!1sen!2sin!4v1731411145243"
                    ></iframe>
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
