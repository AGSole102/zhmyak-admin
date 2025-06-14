import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import AuthTemplate from "./components/templates/AuthTemplate";
import AdminLayout from "./components/templates/AdminLayout";
import UsersPage from "./pages/UsersPage";
import ComboCardsPage from "./pages/ComboCardsPage";
import TasksPage from "./pages/TasksPage";
import Button from "./components/atoms/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BusinessAccountsPage from "./pages/BusinessAccountsPage";
import MarketplaceCardsPage from "./pages/MarketplaceCardsPage";
import CategoriesPage from "./pages/CategoriesPage";
import BusinessDashboardPage from "./pages/BusinessDashboardPage";
import BusinessCardsPage from "./pages/BusinessCardsPage";
import BusinessLayout from "./components/templates/BusinessLayout";
import "./App.css";

function NoAccess() {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mt-8 text-red-600 text-lg mb-4">Нет доступа</div>
      <Button onClick={logout} className="bg-blue-600 text-white">Выйти и войти другим пользователем</Button>
    </div>
  );
}

function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/business-accounts" element={<BusinessAccountsPage />} />
        <Route path="/marketplace-cards" element={<MarketplaceCardsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/combo-cards" element={<ComboCardsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </AdminLayout>
  );
}

function BusinessRoutes() {
  return (
    <BusinessLayout>
      <Routes>
        <Route path="/dashboard" element={<BusinessDashboardPage />} />
        <Route path="/my-cards" element={<BusinessCardsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BusinessLayout>
  );
}

function AppContent() {
  const { accessToken, role } = useAuth();
  if (!accessToken) {
    return <AuthTemplate />;
  }
  if (role === "admin") {
    return <AdminRoutes />;
  }
  if (role === "business") {
    return <BusinessRoutes />;
  }
  return <NoAccess />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
