import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";
import "./Events.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const Events = () => {
  const { currentLanguage, t } = useLanguage();

  const getFontClass = () => {
    switch (currentLanguage) {
      case "ta":
        return "tamil-font";
      case "hi":
        return "hindi-font";
      default:
        return "english-font";
    }
  };

  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      const ev = await fetch(`${API_BASE}/api/events?upcoming=true&limit=6`).then((r) => r.json());
      setEvents(ev);

      const bl = await fetch(`${API_BASE}/api/blog?limit=3`).then((r) => r.json());
      setBlogs(bl);
    })();
  }, []);

  const handleRedirect = () => {
    window.location.href = "/about#events";
  };

  return (
    <section id="events" className="section events-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className={`section-title ${getFontClass()} display-5 fw-bold`}>
            {t("eventsTitle")}
          </h2>
        </div>

        <Row>
          {/* LEFT SIDE: UPCOMING EVENTS */}
          <Col lg={8}>
            <Card className="upcoming-events-card shadow-sm mb-4">
              <Card.Body className="p-4">
                <h4 className={`${getFontClass()} fw-bold mb-4`}>
                  <i className="bi bi-calendar-week me-2 text-primary"></i>
                  {t("upcomingEventsOverview")}
                </h4>

                <Row className="g-3">
                  {events.length === 0 && (
                    <div className="text-muted">No upcoming events</div>
                  )}

                  {events.map((event) => (
                    <Col lg={6} md={12} key={event.id}>
                      <div className="upcoming-event-item d-flex">
                        <img
                          src={event.image || "/images/fallback.png"}
                          alt={event.title}
                          style={{
                            width: 100,
                            height: 70,
                            objectFit: "cover",
                            borderRadius: 6,
                            marginRight: 12,
                          }}
                        />
                        <div>
                          <div className={`${getFontClass()} fw-semibold`}>
                            {event.title}
                          </div>
                          <div className="small text-muted">
                            {event.date} • {event.location}
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>

                {/* VIEW MORE BUTTON */}
                <div className="text-center mt-4">
                  <Button
                    className="action-btn-event px-4 py-2"
                    onClick={handleRedirect}
                  >
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    {t("viewMore") || "View More in About Page"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT SIDE: BLOG PREVIEW */}
          <Col lg={4}>
            <h5 className={`fw-bold mb-3 ${getFontClass()}`}>
              {t("latestArticles") || "Latest Articles"}
            </h5>

            {blogs.map((blog) => (
              <Card key={blog.id} className="mb-3 shadow-sm border-0">
                <div className="d-flex">
                  <img
                    src={blog.thumbnail || "/images/fallback.png"}
                    alt={blog.title}
                    style={{
                      width: 100,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: "6px 0 0 6px",
                    }}
                  />
                  <Card.Body className="p-2">
                    <Card.Title className={`fs-6 ${getFontClass()}`}>
                      {blog.title}
                    </Card.Title>
                    <Card.Text className="small text-muted">
                      {(blog.content || "").slice(0, 80)}...
                    </Card.Text>
                    <a href={`/blog/${blog.id}`} className="small fw-bold text-primary">
                      {t("readMore") || "Read More"}
                    </a>
                  </Card.Body>
                </div>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Events;
