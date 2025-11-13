import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import "../App.css";

const domains = [
  { name: 'Student Field', path: 'student-field', key: 'studentField' },
  { name: 'Youth Field', path: 'youth-field', key: 'youthField' },
  { name: 'Women Field', path: 'womens-field', key: 'womenField' },
  { name: 'Village Field', path: 'village-field', key: 'villageField' },
  { name: 'Environmental', path: 'environmental', key: 'environmental' },
  { name: 'Awareness Field', path: 'awareness-field', key: 'awarenessField' },
  { name: 'Govt Domain', path: 'govt-domain', key: 'govtDomain' },
  { name: 'World Domain', path: 'world-domain', key: 'worldDomain' },
  { name: 'Settings Domain', path: 'settings-domain', key: 'settingsDomain' },
  { name: 'Biology Field', path: 'biology-field', key: 'biologyField' },
];

const Home = () => {
  const { currentLanguage, t } = useLanguage();

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  // Safe translation function with fallback
  const safeTranslate = (key, fallback = '') => {
    const translated = t(key);
    return translated && translated !== key ? translated : fallback;
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="home-hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/images/home-hero.jpg')`,
          marginTop: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero-overlay">
          <Container>
            <Row>
              <Col xs={12} className="text-center">
                <h1 className={`hero-title animated-title ${getFontClass()}`}>
                  {safeTranslate('nalloreVattam', 'Nallore Vattam')}
                </h1>
                <p className={`hero-subtitle animated-subtitle ${getFontClass()}`}>
                  {safeTranslate('communityServiceOrg', 'Community Service Organization')}
                </p>
                <p className={`hero-description animated-description ${getFontClass()}`}>
                  {safeTranslate('heroDescription', 'Building a better community through service and compassion')}
                </p>
                <Button 
                  variant="primary" 
                  size="lg" 
                  href="/about" 
                  className="cta-button animated-button"
                >
                  {safeTranslate('learnMore', 'Learn More')}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview-section section-padding">
        <Container>
          <Row>
            <Col xs={12} md={10} lg={8} className="mx-auto text-center">
              <h2 className={`section-title ${getFontClass()}`}>
                {safeTranslate('aboutUs', 'About Us')}
              </h2>
              <p className={`section-description ${getFontClass()}`}>
                {safeTranslate('aboutDescription', 'We are dedicated to improving our community through various initiatives focused on education, environment, and social welfare.')}
              </p>
              <Button variant="outline-primary" href="/about" className="mt-3">
                {safeTranslate('readMoreAboutUs', 'Read More About Us')}
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Domains Section */}
      <section className="domains-section section-padding bg-light">
        <Container>
          <Row>
            <Col xs={12} className="text-center mb-5">
              <h2 className={`section-title ${getFontClass()}`}>
                {safeTranslate('ourDomains', 'Our Domains')}
              </h2>
              <p className={`section-description ${getFontClass()}`}>
                {safeTranslate('domainsDescription', 'Explore the different fields where we are making an impact.')}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {domains.map((domain, index) => (
              <Col xs={12} sm={6} lg={4} xl={3} key={index} className="mb-4">
                <Card className="domain-card h-100 shadow-sm">
                  <Card.Body className="text-center d-flex flex-column">
                    <div className="domain-icon mb-3">
                      <i className="fas fa-hands-helping fa-2x text-primary"></i>
                    </div>
                    <Card.Title className={`domain-name ${getFontClass()}`}>
                      {safeTranslate(domain.key, domain.name)}
                    </Card.Title>
                    <Card.Text className={`domain-description flex-grow-1 ${getFontClass()}`}>
                      {safeTranslate('exploreInitiatives', 'Explore our initiatives in')} {safeTranslate(domain.key, domain.name.toLowerCase())}
                    </Card.Text>
                    <Button 
                      variant="primary" 
                      href={`/domains/${domain.path}`} 
                      className="domain-button mt-auto"
                      size="sm"
                    >
                      {safeTranslate('exploreDomain', 'Explore Domain')}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;