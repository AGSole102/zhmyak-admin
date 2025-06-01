import React from "react";
import { useAuth } from "../../AuthContext";
import Button from "../atoms/Button";

const Toolbar = ({ onOpenSidebar }) => {
  const { login, role, logout } = useAuth();
  return (
    <header className="w-full flex items-center justify-between bg-white border-b px-8 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={onOpenSidebar} className="md:hidden bg-gray-900 text-white p-2 rounded mr-2">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <span className="font-semibold text-gray-800">{login}</span>
        <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-1">{role}</span>
      </div>
      <Button onClick={logout} className="bg-red-600 text-white">Выйти</Button>
    </header>
  );
};

export default Toolbar; 