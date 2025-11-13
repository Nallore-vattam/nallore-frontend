import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import './YoutubeCards.css';

const YouTubeCards = () => {
  const { currentLanguage, t } = useLanguage();

  const base = import.meta.env.BASE_URL;

  const videos = [
    {
      id: 1,
      title: 'Community Events 2023',
      description: 'Highlights from our community events and cultural programs',
      thumbnail: `${base}images/FieldofAwareness/awareness01.jpg`
    },
    {
      id: 2,
      title: 'Cultural Festival Highlights',
      description: 'Traditional dances and cultural performances from our annual festival',
      thumbnail: `${base}images/FieldofAwareness/awareness02.jpg`
    },
    {
      id: 3,
      title: 'Educational Programs',
      description: 'Our educational initiatives and skill development workshops',
      thumbnail: `${base}images/FieldofBiology/biology01.jpg`
    }
  ];

  const getFontClass = () => {
    switch (currentLanguage) {
      case 'ta': return 'tamil-font';
      case 'hi': return 'hindi-font';
      default: return 'english-font';
    }
  };

  return (
    <section id="youtube" className="section youtube-section">
      <Container>
        <h2 className={`section-title ${getFontClass()}`}>
  {t('youtubeTitle', 'Our YouTube Channel')}
</h2>
<p className={`text-center mb-5 ${getFontClass()}`}>
  {t('youtubeDescription', 'Watch our latest videos and stay updated with our community activities')}
</p>

        <Row>
          {videos.map((video) => (
            <Col lg={4} md={6} className="mb-4" key={video.id}>
              <Card className="youtube-card h-100">
                <div className="video-thumbnail position-relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = `${base}images/FieldofAwareness/awareness01.jpg`;
                    }}
                  />
                  <div className="video-duration position-absolute bottom-0 end-0 m-2">
                    <span className="badge bg-dark bg-opacity-75"></span>
                  </div>
                  <div className="play-button position-absolute top-50 start-50 translate-middle">
                    <div
                      className="play-icon-bubble bg-white bg-opacity-90 d-flex align-items-center justify-content-center"
                      style={{ width: '50px', height: '50px' }}
                    >
                      <i className="bi bi-play-fill text-dark fs-5" style={{ marginLeft: '3px' }}></i>
                    </div>
                  </div>
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className={`${getFontClass()} mb-2`} style={{ fontSize: '1.1rem', lineHeight: '1.4' }}>
                    {video.title}
                  </Card.Title>
                  <Card.Text className={`text-muted mb-3 flex-grow-1 ${getFontClass()}`} style={{ fontSize: '0.9rem' }}>
                    {video.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">{video.views}</span>
                  <button className="action-btn-diamond">
  <i className="bi bi-play-btn me-1"></i>
  {t('watch', 'Watch')}
</button>


                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Channel Stats */}
        <Row className="mt-5">
          <Col lg={3} md={6} className="text-center mb-4">
            <div className="stat-card">
              <h3 className="text-primary mb-2">5K+</h3>
              <p className={`${getFontClass()} mb-0`}>Subscribers</p>
            </div>
          </Col>
          <Col lg={3} md={6} className="text-center mb-4">
            <div className="stat-card">
              <h3 className="text-primary mb-2">120+</h3>
              <p className={`${getFontClass()} mb-0`}>Videos</p>
            </div>
          </Col>
          <Col lg={3} md={6} className="text-center mb-4">
            <div className="stat-card">
              <h3 className="text-primary mb-2">50K+</h3>
              <p className={`${getFontClass()} mb-0`}>Views</p>
            </div>
          </Col>
          <Col lg={3} md={6} className="text-center mb-4">
            <div className="stat-card">
              <h3 className="text-primary mb-2">2 Years</h3>
              <p className={`${getFontClass()} mb-0`}>Creating</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default YouTubeCards;