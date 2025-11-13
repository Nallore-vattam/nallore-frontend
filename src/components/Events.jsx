import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import './Events.css';

const Events = () => {
  const { currentLanguage, t } = useLanguage();

  const safeTranslate = (key, fallback = '') => {
    try {
      const translated = t(key);
      return translated && translated !== key ? translated : fallback;
    } catch (error) {
      return fallback;
    }
  };

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

  const events = [
    { 
      id: 1,
      title: t('event1'),
      date: '2025-01-15',
      location: 'Community Hall',
      category: 'Cultural'
    },
    { 
      id: 2,
      title: t('event2'),
      date: '2025-02-20',
      location: 'Health Center',
      category: 'Health'
    },
    { 
      id: 3,
      title: t('event3'),
      date: '2025-03-10',
      location: 'School Campus',
      category: 'Education'
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Cultural': return '#e74c3c';
      case 'Health': return '#3498db';
      case 'Education': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  const handleRedirect = () => {
    window.location.href = '/about#events';
  };

  return (
    <section id="events" className="section events-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className={`section-title ${getFontClass()} display-5 fw-bold`}>
            {t('eventsTitle')}
          </h2>
        </div>

        {/* Upcoming Events Preview */}
        <Row className="mt-4">
          <Col lg={12}>
            <Card className="upcoming-events-card border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4 className={`${getFontClass()} fw-bold mb-4`}>
                  <i className="bi bi-calendar-week me-2 text-primary"></i>
                  {safeTranslate('upcomingEventsOverview', 'Upcoming Events Overview')}
                </h4>
                <Row className="g-3">
                  {events.map((event) => (
                    <Col lg={4} md={6} key={event.id}>
                      <div className="upcoming-event-item">
                        <div
                          className="event-dot"
                          style={{ backgroundColor: getCategoryColor(event.category) }}
                        ></div>
                        <div className="upcoming-event-content">
                          <div className={`upcoming-event-title ${getFontClass()} fw-semibold`}>
                            {event.title}
                          </div>
                          <div className="upcoming-event-date text-muted small">
                            {event.date} — {event.location}
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>

                {/* Redirect Button */}
                <div className="text-center mt-5">
                  <Button 
                    className="action-btn-event px-4 py-2"
                    onClick={handleRedirect}
                  >
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    {safeTranslate('viewMore', 'View More in About Page')}
                  </Button>
                </div>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Events;