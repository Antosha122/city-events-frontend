import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../api/events";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEvent(id).then(setEvent).catch(console.error);
  }, [id]);

  if (!event) return <p>Загрузка...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="mt-2">{event.description}</p>
      <p className="mt-2 text-gray-500">
        Категория: {event.category} | Локация: {event.locationName}
      </p>
      <p className="mt-2 text-sm text-gray-400">
        Дата начала: {new Date(event.startTime).toLocaleString()}
      </p>
    </div>
  );
}
