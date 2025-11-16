import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api/events";
import EventCard from "../components/EventCard";

export default function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(Array.isArray(data.events) ? data.events : []); // защита от undefined
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">События</h1>

      {events.length === 0 ? (
        <p>Нет событий.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      )}
    </div>
  );
}