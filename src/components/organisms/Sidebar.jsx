import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <aside className="w-56 h-full bg-gray-900 text-white flex flex-col py-6 px-4">
    <div className="text-2xl font-bold mb-8">Админ-панель</div>
    <nav className="flex flex-col gap-2">
      <NavLink
        to="/users"
        className={({ isActive }) =>
          `px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
        }
      >
        Пользователи
      </NavLink>
      {/* Здесь можно добавить другие пункты меню */}
    </nav>
  </aside>
);

export default Sidebar; 