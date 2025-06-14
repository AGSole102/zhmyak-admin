import React from 'react';
import Button from '../atoms/Button';

const UserCard = ({ user, onDetails, onNotification, onBanToggle }) => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <div className="font-bold text-lg mb-2">
        {user.tg_username !== 'not_given' ? user.tg_username : 'Без имени'}
      </div>
      <div className="text-sm text-gray-500 mb-1">UID: {user.uid}</div>
      <div className="text-sm mb-1">TGID: {user.tgid}</div>
      <div className="text-sm mb-4">Активен: {user.active ? "Да" : "Нет"}</div>
      <div className="mt-auto flex gap-2 flex-wrap">
        <Button onClick={() => onDetails(user)} className="bg-blue-700 text-white">
          Детали
        </Button>
        <Button onClick={() => onNotification(user)} className="bg-purple-700 text-white">
          Оповещения
        </Button>
        <Button 
          onClick={() => onBanToggle(user)} 
          className={user.active ? "bg-red-600 text-white" : "bg-green-600 text-white"}
        >
          {user.active ? "Заблокировать" : "Разблокировать"}
        </Button>
      </div>
    </div>
  );
};

export default UserCard; 