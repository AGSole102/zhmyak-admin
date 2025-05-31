import React from "react";
import { useAuth } from "../../AuthContext";
import Button from "../atoms/Button";

const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div className="text-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Добро пожаловать!</h1>
      <Button onClick={logout} className="bg-red-600 text-white">Выйти</Button>
    </div>
  );
};

export default Dashboard; 