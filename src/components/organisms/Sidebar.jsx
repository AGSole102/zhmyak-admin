import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open = true, onClose }) => (
  <>
    {/* Оверлей для мобильных */}
    <div
      className={`fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}
      aria-hidden={!open}
    />
    <aside
      className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col py-6 px-4 z-50 transition-transform md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      style={{ minWidth: 224 }}
    >
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
        <NavLink
          to="/combo-cards"
          className={({ isActive }) =>
            `px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          Карточки комбо
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
          }
        >
          Задания
        </NavLink>
        {/* Здесь можно добавить другие пункты меню */}
      </nav>
    </aside>
  </>
);

export default Sidebar; 