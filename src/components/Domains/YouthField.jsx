import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import domainsData from '../components/mainjsons/Services.json';
import '../styles/client.css';

const ServiceYouth = () => {
  const { currentLanguage, t } = useLanguage();
  const getFontClass = () => currentLanguage === 'ta' ? 'tamil-font' : currentLanguage === 'hi' ? 'hindi-font' : 'english-font';

  const domain = domainsData.domains[6];
  const subdomains = domain.subdomains || Array.from({ length: 10 }, (_, i) => `Subdomain ${i + 1}`);

  return (
    <section className="service-page youth">
      <Container>
        <h2 className={`mb-4 ${getFontClass()}`}>{t(domain.name)}</h2>
        <p className={`mb-5 ${getFontClass()}`}>{domain.description}</p>
        <Row className="g-4">
          {subdomains.map((sub, idx) => (
            <Col lg={4} md={6} key={idx}>
              <Card className="subdomain-card text-center">
                <Card.Body>
                  <Card.Title className={getFontClass()}>{sub}</Card.Title>
                  <Card.Text className={getFontClass()}>Some description about {sub}.</Card.Text>
                  <div className="mb-2">
                    <Badge bg="light" text="dark" className={getFontClass()}>Feature 1</Badge>{' '}
                    <Badge bg="light" text="dark" className={getFontClass()}>Feature 2</Badge>
                  </div>
                  <Button variant="outline-light">{t('knowMore')}</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Youth;
