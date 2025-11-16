import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken, onAuthChange } from "../auth/storage";
import { useRole } from "../hooks/useRole";

export default function Header() {
  const [isAuthed, setIsAuthed] = useState(!!getToken());
  const role = useRole();

  useEffect(() => {
    const unsubscribe = onAuthChange((token) => {
      setIsAuthed(!!token);
    });
    return unsubscribe;
  }, []);

  const linkClasses = ({ isActive }) =>
    `px-4 py-2 rounded hover:bg-gray-200 ${
      isActive ? "text-blue-600 font-semibold underline" : "text-gray-700"
    }`;

  const canCreateEvent = ["admin", "organizer"].includes(role);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Афиша+</h1>
      <nav className="space-x-4">
        <NavLink to="/events" end className={linkClasses}>
          События
        </NavLink>

        {isAuthed && canCreateEvent && (
          <NavLink to="/events/new" className={linkClasses}>
            Добавить событие
          </NavLink>
        )}

        {!isAuthed && (
          <NavLink to="/auth/login" className={linkClasses}>
            Войти / Регистрация
          </NavLink>
        )}

        {isAuthed && (
          <NavLink to="/profile" className={linkClasses}>
            Профиль
          </NavLink>
        )}
      </nav>
    </header>
  );
}
