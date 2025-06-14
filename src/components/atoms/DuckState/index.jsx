import React from 'react';

export const DuckState = ({ duckState }) => (
  <div className="mb-4 border-t pt-4">
    <h3 className="font-semibold mb-2">Состояние утки</h3>
    <div><b>Голод:</b> {duckState.hunger}</div>
    <div><b>Здоровье:</b> {duckState.health}</div>
    <div><b>Счастье:</b> {duckState.happiness}</div>
    <div><b>Энергия:</b> {duckState.energy}</div>
    <div><b>Общий статус:</b> {duckState.general_state}</div>
  </div>
); 