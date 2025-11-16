import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
      <Link to={`/events/${event.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
        {event.title}
      </Link>
      <p className="text-gray-700 mt-1">{event.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        Категория: {event.category} | Локация: {event.locationName}
      </p>
      <p className="text-sm text-gray-400 mt-1">
        Дата: {new Date(event.startTime).toLocaleString()}
      </p>
    </div>
  );
}
