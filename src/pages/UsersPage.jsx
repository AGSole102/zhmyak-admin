import React, { useState } from "react";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import UserCard from "../components/molecules/UserCard";
import CreateUserForm from "../components/molecules/CreateUserForm";
import UserDetailsModal from "../components/organisms/UserDetailsModal";
import UserNotificationModal from "../components/organisms/UserNotificationModal";
import { useUsers } from "../hooks/useUsers";

const UsersPage = () => {
  const { users, loading, error, toggleUserBan, refreshUsers } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [levelInfo, setLevelInfo] = useState(null);
  const [economy, setEconomy] = useState(null);
  const [duckState, setDuckState] = useState(null);
  const [levelLoading, setLevelLoading] = useState(false);
  const [economyLoading, setEconomyLoading] = useState(false);
  const [duckStateLoading, setDuckStateLoading] = useState(false);
  const [levelError, setLevelError] = useState(null);
  const [economyError, setEconomyError] = useState(null);
  const [duckStateError, setDuckStateError] = useState(null);
  const [notifUser, setNotifUser] = useState(null);
  const [showGlobalNotif, setShowGlobalNotif] = useState(false);

  const handleCreateUser = async (formData) => {
    setModalError(null);
    try {
      await import("../../axiosinstance").then(({ default: axios }) => axios.post("/users/reg", formData));
      setShowModal(false);
      refreshUsers();
    } catch (e) {
      setModalError(e.response?.data?.detail || "Ошибка создания пользователя");
    }
  };

  const handleUserDetails = async (user) => {
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
      const axios = (await import("../../axiosinstance")).default;
      const [levelRes, ecoRes, duckRes] = await Promise.all([
        axios.get(`/eco/level/${user.uid}`, { params: { provider: "postgres" } }),
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
          {/* <Button onClick={() => setShowModal(true)} className="bg-blue-600 text-white">
            Создать пользователя
          </Button> */}
          <Button onClick={() => setShowGlobalNotif(true)} className="bg-purple-700 text-white">
            Отправить уведомление
          </Button>
        </div>
      </div>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard
              key={user.uid}
              user={user}
              onDetails={handleUserDetails}
              onNotification={setNotifUser}
              onBanToggle={toggleUserBan}
            />
          ))}
        </div>
      )}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Создать пользователя"
        maxWidth="md"
      >
        <CreateUserForm onSubmit={handleCreateUser} error={modalError} />
      </Modal>
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
        <UserNotificationModal 
          open={!!notifUser} 
          onClose={() => setNotifUser(null)} 
          user={notifUser} 
        />
      )}
      {showGlobalNotif && (
        <UserNotificationModal 
          open={showGlobalNotif} 
          onClose={() => setShowGlobalNotif(false)} 
          user={{ uid: null }} 
        />
      )}
    </div>
  );
};

export default UsersPage;