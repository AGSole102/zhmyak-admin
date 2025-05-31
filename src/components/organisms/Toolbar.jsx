import React from "react";
import { useAuth } from "../../AuthContext";
import Button from "../atoms/Button";

const Toolbar = () => {
  const { login, role, logout } = useAuth();
  return (
    <header className="w-full flex items-center justify-between bg-white border-b px-8 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-gray-800">{login}</span>
        <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-1">{role}</span>
      </div>
      <Button onClick={logout} className="bg-red-600 text-white">Выйти</Button>
    </header>
  );
};

export default Toolbar; 