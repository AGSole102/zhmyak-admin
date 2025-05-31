import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "./AuthService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh_token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accessToken) localStorage.setItem("access_token", accessToken);
    else localStorage.removeItem("access_token");
    if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
    else localStorage.removeItem("refresh_token");
    if (login) localStorage.setItem("login", login);
    else localStorage.removeItem("login");
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [accessToken, refreshToken, login, role]);

  const loginUser = async (loginValue, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AuthService.login(loginValue, password);
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setLogin(data.login);
      setRole(data.role);
      setLoading(false);
      return true;
    } catch (e) {
      setError(e.response?.data?.detail || "Ошибка авторизации");
      setLoading(false);
      return false;
    }
  };

  const register = async (loginValue, password) => {
    setLoading(true);
    setError(null);
    try {
      await AuthService.register(loginValue, password);
      setLoading(false);
      return true;
    } catch (e) {
      setError(e.response?.data?.detail || "Ошибка регистрации");
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await AuthService.logout(refreshToken);
    } catch {}
    setAccessToken(null);
    setRefreshToken(null);
    setLogin(null);
    setRole(null);
    setLoading(false);
  };

  const refresh = async () => {
    if (!refreshToken) return;
    try {
      const data = await AuthService.refresh(refreshToken);
      setAccessToken(data.access_token);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ login, accessToken, refreshToken, role, loading, error, loginUser, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}; 