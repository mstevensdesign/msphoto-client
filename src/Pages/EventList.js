import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/mikestevensphoto-c810c/us-central1/app/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(events);

  return (
    <Container>
      <Row>
        {events.map((event) => (
          <Col lg={4}>
            <Card key={event.id}>
              <Card.Img variant="top" src={event.thumbnail_url} />
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

export default EventList;
