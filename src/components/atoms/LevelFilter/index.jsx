import React from 'react';

export const LevelFilter = ({ value, onChange }) => (
  <select 
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    className="text-sm border rounded px-2 py-1"
  >
    <option value={1}>Уровень 1</option>
    <option value={2}>Уровень 2</option>
    <option value={3}>Уровень 3</option>
  </select>
); 