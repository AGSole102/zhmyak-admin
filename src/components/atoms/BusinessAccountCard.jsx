import React from "react";
import Button from "./Button";

const BusinessAccountCard = ({ business, password, onBan, onDelete, isBanned }) => (
  <div className="border rounded p-4 shadow bg-white flex flex-col gap-2">
    <div className="font-bold text-lg">{business.name}</div>
    <div className="text-gray-600 text-sm">Логин: {business.login}</div>
    <div className="text-gray-600 text-sm">Описание: {business.description}</div>
    <div className="text-gray-600 text-sm">Статус: {business.active ? 'Активен' : 'Забанен'}</div>
    {password && <div className="text-gray-600 text-sm">Пароль: <span className="font-mono">{password}</span></div>}
    <div className="flex gap-2 mt-2">
      <Button onClick={onBan} className={isBanned ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}>
        {isBanned ? 'Разбанить' : 'Забанить'}
      </Button>
      <Button onClick={onDelete} className="bg-gray-400 text-white">Удалить</Button>
    </div>
  </div>
);

export default BusinessAccountCard; 