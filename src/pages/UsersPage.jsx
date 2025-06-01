import React, { useEffect, useState } from "react";
import axios from "../../axiosinstance";
import Button from "../components/atoms/Button";
import { formatDateTime } from "../utils/formatDateTime";
import UserDetailsModal from "../components/organisms/UserDetailsModal";
import UserNotificationModal from "../components/organisms/UserNotificationModal";

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
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDuckState, setShowDuckState] = useState(false);
  const [duckState, setDuckState] = useState(null);
  const [duckStateLoading, setDuckStateLoading] = useState(false);
  const [duckStateError, setDuckStateError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [levelInfo, setLevelInfo] = useState(null);
  const [levelLoading, setLevelLoading] = useState(false);
  const [levelError, setLevelError] = useState(null);
  const [notifUser, setNotifUser] = useState(null);
  const [showGlobalNotif, setShowGlobalNotif] = useState(false);

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

  const openUserDetails = async (user) => {
    setSelectedUser(user);
    setShowDetails(true);
    setEconomy(null);
    setDuckState(null);
    setLevelInfo(null);
    setEconomyLoading(true);
    setDuckStateLoading(true);
    setLevelLoading(true);
    setEconomyError(null);
    setDuckStateError(null);
    setLevelError(null);
    try {
      const [levelRes, ecoRes, duckRes] = await Promise.all([
        axios.get(`/eco/level/${user.uid}`, { params: { provider: "redis" } }),
        axios.get(`/eco/${user.uid}`, { params: { provider: "postgres" } }),
        axios.get(`/eco/states/${user.uid}`)
      ]);
      setLevelInfo(levelRes.data);
      setEconomy(ecoRes.data);
      setDuckState(duckRes.data);
    } catch (e) {
      setLevelError(e.response?.data?.detail || "Ошибка загрузки уровня пользователя");
      setEconomyError(e.response?.data?.detail || "Ошибка загрузки экономики пользователя");
      setDuckStateError(e.response?.data?.detail || "Ошибка загрузки состояния утки");
    } finally {
      setLevelLoading(false);
      setEconomyLoading(false);
      setDuckStateLoading(false);
    }
  };

  const closeUserDetails = () => {
    setShowDetails(false);
    setSelectedUser(null);
    setEconomy(null);
    setDuckState(null);
    setLevelInfo(null);
    setEconomyError(null);
    setDuckStateError(null);
    setLevelError(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Пользователи</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Button onClick={openCreateModal} className="bg-blue-600 text-white">Создать пользователя</Button>
          <Button onClick={() => setShowGlobalNotif(true)} className="bg-purple-700 text-white">Отправить уведомление</Button>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6">
        {loading && <div>Загрузка...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.uid} className="border rounded-lg p-4 flex flex-col gap-2 shadow hover:shadow-md transition">
                <div className="font-bold text-lg">{user.login}</div>
                <div className="text-sm text-gray-500">UID: {user.uid}</div>
                <div className="text-sm">Роль: <b>{user.role}</b></div>
                <div className="text-sm">TGID: {user.tgid}</div>
                <div className="text-sm">Активен: {user.is_active ? "Да" : "Нет"}</div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Button onClick={() => openUserDetails(user)} className="bg-blue-700 text-white">Детали</Button>
                  <Button onClick={() => setNotifUser(user)} className="bg-purple-700 text-white">Оповещения</Button>
                  <Button onClick={() => handleDelete(user.uid)} className="bg-red-600 text-white">Удалить</Button>
                </div>
              </div>
            ))}
          </div>
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
      {showDetails && (
        <UserDetailsModal
          open={showDetails}
          onClose={closeUserDetails}
          user={selectedUser}
          levelInfo={levelInfo}
          economy={economy}
          duckState={duckState}
          loading={levelLoading || economyLoading || duckStateLoading}
          error={levelError || economyError || duckStateError}
        />
      )}
      {notifUser && (
        <UserNotificationModal open={!!notifUser} onClose={() => setNotifUser(null)} user={notifUser} />
      )}
      {showGlobalNotif && (
        <UserNotificationModal open={showGlobalNotif} onClose={() => setShowGlobalNotif(false)} user={{ uid: null }} />
      )}
    </div>
  );
};

export default UsersPage;
