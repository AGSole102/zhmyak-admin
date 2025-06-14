import React from 'react';

export const UserInfo = ({ user }) => (
  <div className="mb-4">
    <div><b>UID:</b> {user.uid}</div>
    <div><b>TGID:</b> {user.tgid}</div>
    <div>
      <b>Имя в Telegram:</b> {user.tg_username !== 'not_given' ? user.tg_username : 'Не указано'}
    </div>
    <div><b>Активен:</b> {user.active ? "Да" : "Нет"}</div>
  </div>
); 