import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register as registerUser } from "../api/auth";
import { saveToken, saveUserId, getOrganizerIdFromToken } from "../auth/storage";

export default function Auth({ initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // новая переменная
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const APP_ID = import.meta.env.VITE_APP_ID;

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = { email, password, app_id: Number(APP_ID) };

      // добавляем роль только при регистрации
      if (mode === "register") payload.role = role;

      const data = mode === "login" ? await login(payload) : await registerUser(payload);

      if (data && data.token) {
        console.log("Login/Register response:", data);
        saveToken(data.token);

        const uid = getOrganizerIdFromToken();
        if (uid) saveUserId(uid);
      }

      navigate("/events");
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.message || "Ошибка, попробуйте ещё раз";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto bg-white shadow rounded p-6">
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 rounded-l ${
            mode === "login" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => {
            setMode("login");
            navigate("/auth/login", { replace: true });
          }}
          disabled={loading}
        >
          Вход
        </button>
        <button
          className={`flex-1 py-2 rounded-r ${
            mode === "register" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => {
            setMode("register");
            navigate("/auth/register", { replace: true });
          }}
          disabled={loading}
        >
          Регистрация
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
            minLength={6}
            required
          />
        </div>

        {/* поле выбора роли — только при регистрации */}
        {mode === "register" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Роль
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="user">Пользователь</option>
              <option value="organizer">Организатор</option>
            </select>
          </div>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading
            ? "Подождите..."
            : mode === "login"
            ? "Войти"
            : "Зарегистрироваться"}
        </button>
      </form>
    </section>
  );
}
