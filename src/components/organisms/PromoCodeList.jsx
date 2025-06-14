import React from "react";
import Button from "../atoms/Button";

const PromoCodeList = ({ codes, onGenerate, loading, error, isAdmin }) => (
  <div className="bg-white rounded shadow p-4 mt-4">
    <div className="flex justify-between items-center mb-4">
      <div className="font-bold text-lg">Промокоды</div>
      {onGenerate && <Button onClick={onGenerate} className="bg-blue-600 text-white">Сгенерировать</Button>}
    </div>
    {loading && <div>Загрузка...</div>}
    {error && <div className="text-red-600 mb-2">{error}</div>}
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="text-left px-2 py-1">Код</th>
            <th className="text-left px-2 py-1">Активен</th>
            {isAdmin && <th className="text-left px-2 py-1">Куплен</th>}
          </tr>
        </thead>
        <tbody>
          {codes.map((c) => (
            <tr key={c.code}>
              <td className="px-2 py-1 font-mono">{c.code}</td>
              <td className="px-2 py-1">{c.active ? 'Да' : 'Нет'}</td>
              {isAdmin && <td className="px-2 py-1">{c.is_bought ? 'Да' : 'Нет'}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PromoCodeList; 