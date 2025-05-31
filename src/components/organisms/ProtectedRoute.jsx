import React from "react";
import { useAuth } from "../../AuthContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuth();
  if (!accessToken) {
    return <div className="text-center mt-8 text-red-600">Доступ запрещён. Войдите в систему.</div>;
  }
  return children;
};

export default ProtectedRoute; 