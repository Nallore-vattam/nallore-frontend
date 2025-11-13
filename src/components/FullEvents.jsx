import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import './Events.css';


const FullEvents = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const events = [
    { id: 1, title: "Community Cleanup Drive", date: "2025-01-15", location: "Park Area" },
    { id: 2, title: "Health Awareness Camp", date: "2025-02-20", location: "Community Hall" },
    { id: 3, title: "Youth Workshop", date: "2025-03-10", location: "Town Hall" },
    { id: 4, title: "Tree Plantation", date: "2025-04-05", location: "Village Grounds" },
  ];

  const filteredEvents = events.filter(
    (event) => new Date(event.date).getMonth() === selectedMonth
  );

  const handleAddReview = () => {
    if (!newReview.trim()) return;
    setReviews((prev) => [...prev, newReview]);
    setNewReview("");
  };

  return (
    <section id="full-events" className="section full-events-section py-5">
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
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Col lg={4} md={6} key={event.id}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body>
                    <h5>{event.title}</h5>
                    <p className="text-muted mb-1">
                      <i className="bi bi-calendar-event"></i> {event.date}
                    </p>
                    <p className="text-muted">
                      <i className="bi bi-geo-alt"></i> {event.location}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No events found for this month.</p>
          )}
        </Row>

        {/* Reviews Section */}
        <div className="reviews-section mt-5 text-center">
          <h4>Past Event Reviews</h4>
          <textarea
            className="form-control w-75 mx-auto mt-3"
            rows="3"
            placeholder="Share your experience..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></textarea>
          <Button className="mt-3" onClick={handleAddReview}>
            Submit Review
          </Button>

          <div className="mt-4">
            {reviews.length === 0 ? (
              <p>No reviews yet. Be the first to share!</p>
            ) : (
              reviews.map((r, i) => (
                <Card key={i} className="mt-3 w-75 mx-auto">
                  <Card.Body>{r}</Card.Body>
                </Card>
              ))
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FullEvents;
