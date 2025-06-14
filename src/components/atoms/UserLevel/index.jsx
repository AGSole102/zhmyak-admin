import React from 'react';

export const UserLevel = ({ levelInfo }) => (
  <div className="mb-4 border-t pt-4">
    <h3 className="font-semibold mb-2">Уровень</h3>
    <div><b>Уровень:</b> {levelInfo.level}</div>
    <div><b>Опыт:</b> {levelInfo.exp}</div>
    <div><b>До следующего уровня:</b> {levelInfo.threshold}</div>
  </div>
); 