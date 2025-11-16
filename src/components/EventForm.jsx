import { useState } from "react";

export default function EventForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    locationAddress: "",
    startTime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 space-y-4 border rounded shadow">
      <h2 className="text-2xl font-bold">Добавить событие</h2>

      <input
        type="text"
        name="title"
        placeholder="Название"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Описание"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Категория"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="locationAddress"
        placeholder="Адрес"
        value={form.locationAddress}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="datetime-local"
        name="startTime"
        value={form.startTime}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
      >
        Сохранить
      </button>
    </form>
  );
}
