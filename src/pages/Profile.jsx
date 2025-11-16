import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/users";
import { getMyEvents } from "../api/events";
import { getToken } from "../auth/storage";
import EventCard from "../components/EventCard";

export default function Profile() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) {
      navigate("/auth/login");
      return;
    }

    let isMounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const meResp = await getMe();
        if (!isMounted) return;
        setMe(meResp);

        // если пользователь — организатор, загружаем события
        if (meResp.role === "organizer") {
          const eventsResp = await getMyEvents();
          if (!isMounted) return;
          setEvents(eventsResp.events || []);
        }
      } catch (err) {
        if (!isMounted) return;
        const message = err?.response?.data?.message || "Не удалось загрузить профиль";
        setError(message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p className="p-6">Загрузка...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!me) return <p className="p-6">Вы не авторизованы.</p>;

  const roleMap = {
    admin: "Администратор",
    organizer: "Организатор",
    user: "Пользователь",
  };

  return (
    <section className="space-y-6">
      <div className="bg-white shadow rounded p-6">
        
        
        <p className="text-gray-500 text-base font-light">
          {roleMap[me.role]}
        </p>
        <p className="text-black-700 text-xl font-medium">
          {me.email}
        </p>
      </div>

      {me.role === "organizer" && (
        <div>
          <h3 className="text-2xl font-semibold mb-3">Мои события</h3>
          {events.length === 0 ? (
            <p className="text-gray-600">У вас пока нет созданных событий.</p>
          ) : (
            <div >
              {events.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
