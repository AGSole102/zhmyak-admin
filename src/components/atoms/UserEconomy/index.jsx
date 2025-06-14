import React from 'react';

export const UserEconomy = ({ economy }) => (
  <div className="mb-4 border-t pt-4">
    <h3 className="font-semibold mb-2">Экономика</h3>
    <div><b>Монеты:</b> {economy.coins}</div>
    <div><b>Билеты:</b> {economy.tickets}</div>
  </div>
); 