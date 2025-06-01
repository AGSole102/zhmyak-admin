import React, { useState } from "react";
import { formatDateTime } from "../../utils/formatDateTime";
import UserReferralModal from "./UserReferralModal";
import Modal from "../molecules/Modal";

const UserDetailsModal = ({ open, onClose, user, levelInfo, economy, duckState, loading, error }) => {
  const [showReferral, setShowReferral] = useState(false);
  
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title="Детали пользователя"
      >
        {loading && <div>Загрузка...</div>}
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        {user && (
          <div className="mb-4">
            <div><b>UID:</b> {user.uid}</div>
            <div><b>Логин:</b> {user.login}</div>
            <div><b>Роль:</b> {user.role}</div>
            <div><b>TGID:</b> {user.tgid}</div>
            <div><b>Активен:</b> {user.is_active ? "Да" : "Нет"}</div>
            <button onClick={() => setShowReferral(true)} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Рефералы</button>
          </div>
        )}
        {levelInfo && (
          <div className="mb-4 border-t pt-4">
            <h3 className="font-semibold mb-2">Уровень</h3>
            <div><b>Уровень:</b> {levelInfo.level}</div>
            <div><b>Опыт:</b> {levelInfo.exp}</div>
            <div><b>Порог:</b> {levelInfo.threshold}</div>
          </div>
        )}
        {economy && (
          <div className="mb-4 border-t pt-4">
            <h3 className="font-semibold mb-2">Экономика</h3>
            <div><b>Монеты:</b> {economy.coins}</div>
            <div><b>Билеты:</b> {economy.tickets}</div>
          </div>
        )}
        {duckState && (
          <div className="mb-4 border-t pt-4">
            <h3 className="font-semibold mb-2">Состояние утки</h3>
            <div><b>Голод:</b> {duckState.hunger}</div>
            <div><b>Здоровье:</b> {duckState.health}</div>
            <div><b>Счастье:</b> {duckState.happiness}</div>
            <div><b>Общий статус:</b> {duckState.general_state}</div>
            <div><b>Энергия:</b> {duckState.energy}</div>
            <div><b>Следующее обновление счастья:</b> {formatDateTime(duckState.next_happiness_update)}</div>
          </div>
        )}
      </Modal>
      {showReferral && (
        <UserReferralModal open={showReferral} onClose={() => setShowReferral(false)} user={user} />
      )}
    </>
  );
};

export default UserDetailsModal; 