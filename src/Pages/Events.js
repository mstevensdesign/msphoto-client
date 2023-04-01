import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/mikestevensphoto-c810c/us-central1/app/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <p>{event.name}</p>
            {event.desc && <p>{event.desc}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
