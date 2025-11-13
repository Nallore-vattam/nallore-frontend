import React from 'react';
import FullEvents from '../components/FullEvents';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

const About = () => {
  const { currentLanguage, t } = useLanguage();

  const getFontClass = () => {
    switch(currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  // Hierarchical Team Structure
  const teamStructure = {
    stateCoordinator: [
      {
        name: 'Yathin',
        role: t('stateCoordinator') || 'State Coordinator',
        image: '/images/Leadership/state-coordinator.jpg',
        description: t('stateCoordinatorDesc') || 'Overall in-charge of Nallore Vattam operations across the state',
        level: 'state'
      }
    ],
    advisors: [
      {
        name: 'Senior Advisor 1',
        role: t('seniorAdvisor') || 'Senior Advisor',
        image: '/images/Leadership/advisor1.jpg',
        description: t('advisorDesc') || 'Strategic guidance and community development',
        level: 'advisor'
      },
      {
        name: 'Senior Advisor 2',
        role: t('seniorAdvisor') || 'Senior Advisor',
        image: '/images/Leadership/advisor2.jpg',
        description: t('advisorDesc') || 'Strategic guidance and community development',
        level: 'advisor'
      },
      {
        name: 'Senior Advisor 3',
        role: t('seniorAdvisor') || 'Senior Advisor',
        image: '/images/Leadership/advisor3.jpg',
        description: t('advisorDesc') || 'Strategic guidance and community development',
        level: 'advisor'
      }
    ],
    zonalCoordinators: Array.from({ length: 12 }, (_, i) => ({
      name: `Zonal Coordinator ${i + 1}`,
      role: t('zonalCoordinator') || 'Zonal Coordinator',
      image: `/images/Leadership/zonal${(i % 5) + 1}.jpg`,
      description: t('zonalCoordinatorDesc') || 'Managing regional operations and coordination',
      level: 'zonal'
    })),
    domainAdmins: Array.from({ length: 10 }, (_, i) => ({
      name: `Domain Admin ${i + 1}`,
      role: t('domainAdmin') || 'Domain Administrator',
      image: `/images/Leadership/domain${(i % 5) + 1}.jpg`,
      description: t('domainAdminDesc') || 'Specialized domain management and oversight',
      level: 'domain'
    })),
    districtCoordinators: Array.from({ length: 39 }, (_, i) => ({
      name: `District Coordinator ${i + 1}`,
      role: t('districtCoordinator') || 'District Coordinator',
      image: `/images/Leadership/district${(i % 5) + 1}.jpg`,
      description: t('districtCoordinatorDesc') || 'District-level implementation and monitoring',
      level: 'district'
    }))
  };

  const milestones = [
    { 
      year: '2014', 
      event: t('organizationFounded'), 
      description: t('startedWith50Members'),
      icon: '🏛️',
      color: 'primary'
    },
    { 
      year: '2016', 
      event: t('firstCommunityCenter'), 
      description: t('establishedPermanentSpace'),
      icon: '🏠',
      color: 'success'
    },
    { 
      year: '2018', 
      event: t('educationProgramLaunch'), 
      description: t('scholarshipsForStudents'),
      icon: '🎓',
      color: 'info'
    },
    { 
      year: '2020', 
      event: t('digitalTransformation'), 
      description: t('onlineCommunityPlatform'),
      icon: '💻',
      color: 'warning'
    },
    { 
      year: '2023', 
      event: t('members500'), 
      description: t('communityGrowthMilestone'),
      icon: '👥',
      color: 'danger'
    }
  ];

  return (
    <div className="about-page">
      {/* Modern Hero Section */}
      <section className="page-hero about-hero">
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
                  {t('aboutNalloreVattam')}
                </h1>
                <p className={`hero-subtitle ${getFontClass()}`}>
                  {t('aboutSubtitle')}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="section mission-vision-section" style={{ marginTop: "20px" }}>
        <Container>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="h-100 mission-card">
                <Card.Body className="p-4 text-center">
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-bullseye text-primary fs-1"></i>
                  </div>
                  <Card.Title className={`${getFontClass()} mb-3`}>
                    {t('ourMission')}
                  </Card.Title>
                  <Card.Text className={getFontClass()}>
                    {t('missionDescription')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 vision-card">
                <Card.Body className="p-4 text-center">
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-eye text-primary fs-1"></i>
                  </div>
                  <Card.Title className={`${getFontClass()} mb-3`}>
                    {t('ourVision')}
                  </Card.Title>
                  <Card.Text className={getFontClass()}>
                    {t('visionDescription')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* History Timeline */}
      <section className="section milestones-section" style={{ padding: '60px 0' }}>
        <Container>
          <h2 className={`section-title text-center mb-5 ${getFontClass()}`}>
            {t('ourJourney')}
          </h2>
          <Row className="g-4">
            {milestones.map((milestone, index) => (
              <Col lg={4} md={6} key={index}>
                <Card 
                  className={`milestone-card h-100 border-${milestone.color} shadow-sm`}
                  style={{ 
                    borderTop: `4px solid var(--bs-${milestone.color})`,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <Card.Body className="text-center p-4">
                    <div 
                      className={`milestone-year-badge bg-${milestone.color} text-white rounded-pill mb-3 mx-auto`}
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {milestone.year}
                    </div>

                    <div className="milestone-icon mb-3" style={{ fontSize: '3rem' }}>
                      {milestone.icon}
                    </div>

                    <Card.Title className={`${getFontClass()} h5 mb-3`}>
                      {milestone.event}
                    </Card.Title>
                    <Card.Text className={`${getFontClass()} text-muted`}>
                      {milestone.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <FullEvents />

      {/* Hierarchical Team Structure */}
      {/* State Coordinator - Single Large Card */}
      <section className="section team-section state-coordinator-section">
        <Container>
          <h2 className={`section-title text-center mb-5 ${getFontClass()}`}>
            {t('stateLeadership') || 'State Leadership'}
          </h2>
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              {teamStructure.stateCoordinator.map((member, index) => (
                <Card key={index} className="state-coordinator-card text-center">
                  <div className="state-badge">State Coordinator</div>
                  <Card.Img 
                    variant="top" 
                    src={member.image}
                    className="state-coordinator-img"
                    onError={(e) => {
                      e.target.src = '/images/FieldofAwareness/awareness01.jpg';
                    }}
                  />
                  <Card.Body>
                    <Card.Title className={`${getFontClass()} h4 mb-2`}>{member.name}</Card.Title>
                    <Card.Subtitle className="mb-3 text-primary fs-5">{member.role}</Card.Subtitle>
                    <Card.Text className={getFontClass()}>
                      {member.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Advisors - 3 Medium Cards */}
      <section className="section team-section advisors-section bg-light">
        <Container>
          <h2 className={`section-title text-center mb-5 ${getFontClass()}`}>
            {t('seniorAdvisors') || 'Senior Advisors'}
          </h2>
          <Row className="g-4">
            {teamStructure.advisors.map((member, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className="advisor-card text-center h-100">
                  <Card.Img 
                    variant="top" 
                    src={member.image}
                    className="advisor-img"
                    onError={(e) => {
                      e.target.src = '/images/FieldofAwareness/awareness01.jpg';
                    }}
                  />
                  <Card.Body>
                    <Card.Title className={getFontClass()}>{member.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-primary">{member.role}</Card.Subtitle>
                    <Card.Text className={getFontClass()}>
                      {member.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Zonal Coordinators - 12 Small Cards */}
      <section className="section team-section zonal-coordinators-section">
        <Container>
          <h2 className={`section-title text-center mb-5 ${getFontClass()}`}>
            {t('zonalCoordinators') || 'Zonal Coordinators'}
          </h2>
          <Row className="g-3">
            {teamStructure.zonalCoordinators.map((member, index) => (
              <Col xl={3} lg={4} md={6} key={index}>
                <Card className="zonal-coordinator-card text-center h-100">
                  <Card.Img 
                    variant="top" 
                    src={member.image}
                    className="zonal-coordinator-img"
                    onError={(e) => {
                      e.target.src = '/images/FieldofAwareness/awareness01.jpg';
                    }}
                  />
                  <Card.Body>
                    <Card.Title className={`${getFontClass()} h6`}>{member.name}</Card.Title>
                    <Card.Subtitle className="mb-1 text-muted small">{member.role}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Domain Admins - 10 Compact Cards */}
      <section className="section team-section domain-admins-section bg-light">
        <Container>
          <h2 className={`section-title text-center mb-5 ${getFontClass()}`}>
            {t('domainAdministrators') || 'Domain Administrators'}
          </h2>
          <Row className="g-2">
            {teamStructure.domainAdmins.map((member, index) => (
              <Col xl={2} lg={3} md={4} sm={6} key={index}>
                <Card className="domain-admin-card text-center h-100">
                  <Card.Img 
                    variant="top" 
                    src={member.image}
                    className="domain-admin-img"
                    onError={(e) => {
                      e.target.src = '/images/FieldofAwareness/awareness01.jpg';
                    }}
                  />
                  <Card.Body className="p-2">
                    <Card.Title className={`${getFontClass()} small mb-1`}>{member.name}</Card.Title>
                    <Card.Subtitle className="text-muted x-small">{member.role}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* District Coordinators - 39 Compact Cards */}
      <section className="section team-section district-coordinators-section">
        <Container>
          <h2 className={`section-title text-center mb-5 ${getFontClass()}`}>
            {t('districtCoordinators') || 'District Coordinators'}
          </h2>
          <Row className="g-2">
            {teamStructure.districtCoordinators.map((member, index) => (
              <Col xl={2} lg={3} md={4} sm={6} key={index}>
                <Card className="district-coordinator-card text-center h-100">
                  <Card.Img 
                    variant="top" 
                    src={member.image}
                    className="district-coordinator-img"
                    onError={(e) => {
                      e.target.src = '/images/FieldofAwareness/awareness01.jpg';
                    }}
                  />
                  <Card.Body className="p-2">
                    <Card.Title className={`${getFontClass()} small mb-1`}>{member.name}</Card.Title>
                    <Card.Subtitle className="text-muted x-small">{member.role}</Card.Subtitle>
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

export default About;