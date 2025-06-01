import React, { useState } from "react";
import { formatDateTime } from "../../utils/formatDateTime";
import UserReferralModal from "./UserReferralModal";

const UserDetailsModal = ({ open, onClose, user, levelInfo, economy, duckState, loading, error }) => {
  const [showReferral, setShowReferral] = useState(false);
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded shadow p-8 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">×</button>
        <h2 className="text-xl font-bold mb-4">Детали пользователя</h2>
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
        {showReferral && (
          <UserReferralModal open={showReferral} onClose={() => setShowReferral(false)} user={user} />
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal; 