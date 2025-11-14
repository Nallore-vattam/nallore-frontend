import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Events.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function FullEvents() {
  const [events, setEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    fetch(`${API_BASE}/api/events`)
      .then((r) => r.json())
      .then(setEvents);
  }, []);

  const filtered = events.filter(
    (ev) => new Date(ev.date).getMonth() === selectedMonth
  );

  return (
    <section id="events" className="section full-events-section py-5">
      <Container>
        <h2 className="text-center mb-5 fw-bold">Community Events Calendar</h2>

        {/* Month Selector */}
        <div className="text-center mb-4">
          <select
            className="form-select w-auto mx-auto"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        {/* Events */}
        <Row className="g-4">
          {filtered.length > 0 ? (
            filtered.map((ev) => (
              <Col lg={4} md={6} key={ev.id}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Img
                    src={ev.image || "/images/fallback.png"}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                  <Card.Body>
                    <h5>{ev.title}</h5>
                    <p className="text-muted mb-1">
                      <i className="bi bi-calendar-event"></i> {ev.date}
                    </p>
                    <p className="text-muted">
                      <i className="bi bi-geo-alt"></i> {ev.location}
                    </p>
                    <span className="badge bg-primary">{ev.category}</span>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No events found for this month.</p>
          )}
        </Row>
      </Container>
    </section>
  );
}
