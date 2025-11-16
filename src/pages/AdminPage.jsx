import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../auth/storage";
import { useRole } from "../hooks/useRole";

export default function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const role = useRole();

  
  

  useEffect(() => {
    // редирект, если не админ
    if (!getToken() || role !== "admin") {
      navigate("/");
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось получить список пользователей");
        return res.json();
      })
      .then((data) => {
        setUsers(data.users || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Ошибка при загрузке списка пользователей");
      });
  }, [role]);

  if (role !== "admin") return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Пользователи</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Роль</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
