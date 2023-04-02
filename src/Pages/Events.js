import { useState, useEffect } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";

const Events = () => {
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
      {events.map((event) => (
        <Card key={event.id}>
          <Card.Img variant="top" src={event.thumbnail_url} />
          <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            {event.desc && <Card.Text>{event.desc}</Card.Text>}
            {event.photoDir && (
              <Card.Text>Photo directory: {event.photoDir}</Card.Text>
            )}
            <Button as={Link} to={`/images/event_id/${event.event_id}`}>
              View Photos
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Events;
