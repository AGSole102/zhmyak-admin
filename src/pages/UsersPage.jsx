import React, { useEffect, useState } from "react";
import axios from "../../axiosinstance";
import Button from "../components/atoms/Button";

const initialForm = { tgid: "", login: "", password: "", role: "user", is_active: true };

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [modalError, setModalError] = useState(null);
  const [showEconomy, setShowEconomy] = useState(false);
  const [economy, setEconomy] = useState(null);
  const [economyLoading, setEconomyLoading] = useState(false);
  const [economyError, setEconomyError] = useState(null);
  const [setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("/users/all");
      setUsers(data);
    } catch (e) {
      setError(e.response?.data?.detail || "Ошибка загрузки пользователей");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setForm(initialForm);
    setShowModal(true);
    setModalError(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(initialForm);
    setModalError(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError(null);
    try {
      await axios.post("/users/reg", {
        ...form,
        tgid: form.tgid ? Number(form.tgid) : undefined,
      });
      closeModal();
      fetchUsers();
    } catch (e) {
      setModalError(e.response?.data?.detail || "Ошибка создания пользователя");
    }
  };

  const handleDelete = async (uid) => {
    if (!window.confirm("Удалить пользователя?")) return;
    try {
      await axios.delete(`/users`, { params: { uid } });
      fetchUsers();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка удаления пользователя");
    }
  };

  const openEconomyModal = async (user) => {
    setSelectedUser(user);
    setShowEconomy(true);
    setEconomy(null);
    setEconomyError(null);
    setEconomyLoading(true);
    try {
      const { data } = await axios.get(`/eco/${user.uid}`, { params: { provider: "postgres" } });
      setEconomy(data);
    } catch (e) {
      setEconomyError(e.response?.data?.detail || "Ошибка загрузки экономики пользователя");
    } finally {
      setEconomyLoading(false);
    }
  };

  const closeEconomyModal = () => {
    setShowEconomy(false);
    setEconomy(null);
    setEconomyError(null);
    setSelectedUser(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Пользователи</h1>
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={openCreateModal} className="bg-blue-600 text-white">Создать пользователя</Button>
      </div>
      <div className="bg-white rounded shadow p-6">
        {loading && <div>Загрузка...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {!loading && !error && (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">UID</th>
                <th className="text-left py-2 px-3">Логин</th>
                <th className="text-left py-2 px-3">Роль</th>
                <th className="text-left py-2 px-3">TGID</th>
                <th className="text-left py-2 px-3">Активен</th>
                <th className="text-left py-2 px-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">{user.uid}</td>
                  <td className="py-2 px-3">{user.login}</td>
                  <td className="py-2 px-3">{user.role}</td>
                  <td className="py-2 px-3">{user.tgid}</td>
                  <td className="py-2 px-3">{user.is_active ? "Да" : "Нет"}</td>
                  <td className="py-2 px-3 flex gap-2">
                    <Button onClick={() => openEconomyModal(user)} className="bg-gray-600 text-white">Детали</Button>
                    <Button onClick={() => handleDelete(user.uid)} className="bg-red-600 text-white">Удалить</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded shadow p-8 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">×</button>
            <h2 className="text-xl font-bold mb-4">Создать пользователя</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="login"
                value={form.login}
                onChange={handleChange}
                placeholder="Логин"
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Пароль"
                className="border rounded px-3 py-2"
                required
              />
              <input
                name="tgid"
                type="number"
                value={form.tgid}
                onChange={handleChange}
                placeholder="TGID"
                className="border rounded px-3 py-2"
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <label className="flex items-center gap-2">
                <input
                  name="is_active"
                  type="checkbox"
                  checked={form.is_active}
                  onChange={handleChange}
                />
                Активен
              </label>
              {modalError && <div className="text-red-600 text-sm">{modalError}</div>}
              <Button type="submit" className="bg-blue-600 text-white mt-2">
                Создать
              </Button>
            </form>
          </div>
        </div>
      )}
      {showEconomy && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={closeEconomyModal}>
          <div className="bg-white rounded shadow p-8 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeEconomyModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">×</button>
            <h2 className="text-xl font-bold mb-4">Экономика пользователя</h2>
            {economyLoading && <div>Загрузка...</div>}
            {economyError && <div className="text-red-600 text-sm mb-2">{economyError}</div>}
            {economy && (
              <div className="flex flex-col gap-2">
                <div><b>UID:</b> {economy.uid}</div>
                <div><b>Монеты:</b> {economy.coins}</div>
                <div><b>Билеты:</b> {economy.tickets}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
