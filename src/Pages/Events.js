import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Ratio } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/mikestevensphoto-c810c/us-central1/app/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <Row className="mt-3">
        {events.map((event) => (
          <Col lg={4} className="mb-3" key={event.id}>
            <Card key={event.id} className="text-center">
              <Card.Img
                variant="top"
                src={event.thumbnail_url}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  maxHeight: "220px",
                }}
              />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                {event.desc && <Card.Text>{event.desc}</Card.Text>}
                {event.photoDir && (
                  <Card.Text>Photo directory: {event.photoDir}</Card.Text>
                )}
                <Button as={Link} to={`/events/${event.event_id}`}>
                  View Photos
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Events;
