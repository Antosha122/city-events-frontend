import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import EventsList from "./pages/EventsList";
import AddEvent from "./pages/AddEvent";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <Routes>
          {/* Главная страница с карточками */}
          <Route path="/" element={<Navigate to="/events" />} />
          <Route path="/events/" element={<EventsList />} />

          {/* Страница добавления события */}
          <Route path="/events/new" element={<AddEvent />} />
          
          {/* Вход / Регистрация */}
          <Route path="/auth" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<Auth initialMode="login" />} />
          <Route path="/auth/register" element={<Auth initialMode="register" />} />

          {/* Профиль пользователя */}
          <Route path="/profile" element={<Profile />} />

          {/* Админка */}
          <Route path="/admin" element={<AdminPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;