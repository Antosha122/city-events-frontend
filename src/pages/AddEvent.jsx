import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, getUserId } from "../auth/storage";
import { useRole } from "../hooks/useRole";
import { createEvent } from "../api/events";
import { getCategories, getLocations } from "../api/meta";

export default function AddEvent() {
  const navigate = useNavigate();
  const role = useRole();

  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryID: "",
    locationID: "",
    startTime: "",
  });

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // redirect to auth if not logged in
    if (!getToken()) {
      navigate("/auth/login");
      return;
    }
  
    if (role === null || role === undefined) return; // ждём загрузки роли
  
    if (!["admin", "organizer"].includes(role)) {
      navigate("/events");
    }

    Promise.all([getCategories(), getLocations()])
      .then(([cats, locs]) => {
        setCategories(cats.categories || []);
        setLocations(locs.locations || []);
      })
      .catch(console.error);
  }, [role, navigate]);

  const handleChange = (e) => {
    const value = e.target.type === "select-one" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      startTime: form.startTime + ":00Z",
      organizer_id: getUserId()
    };

    await createEvent(payload);
    navigate("/events");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Добавить событие</h1>

      <input
        type="text"
        name="title"
        placeholder="Название"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Описание"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="categoryID"
        value={form.categoryID}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Выбери категорию</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        name="locationID"
        value={form.locationID}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Выбери локацию</option>
        {locations.map(loc => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        name="startTime"
        value={form.startTime}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Сохранить
      </button>
    </form>
  );
}