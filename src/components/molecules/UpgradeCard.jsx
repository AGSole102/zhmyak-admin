import React from "react";
import Button from "../atoms/Button";
import ImageWithFallback from "../atoms/ImageWithFallback";

const UpgradeCard = ({ card, dependencies, depLoading, depError, onEdit, onDelete, onAddDep, onDeleteDep, getCardDependencies }) => (
  <div className="bg-white rounded shadow p-4 flex flex-col">
    <div className="font-bold text-lg mb-2">{card.name["ru-RU"] || card.name}</div>
    <div className="mb-2 text-sm text-gray-500">Тип: {card.card_type}</div>
    <div className="mb-2">Цена: {card.init_price}</div>
    <div className="mb-2">{card.description}</div>
    {card.picture && (
      <ImageWithFallback 
        src={"https://quackit.ru:8443/images/business/" + card.card_type + "/" + card.picture}
        alt={card.name["ru-RU"] || card.name}
        className="w-32 h-32 object-contain mb-2"
      />
    )}
    <div className="mb-2">
      <b>Зависимости:</b>
      {depLoading ? (
        <span>Загрузка...</span>
      ) : (
        <ul className="list-disc ml-5">
          {getCardDependencies(card.card_id).length === 0 && <li>Нет</li>}
          {getCardDependencies(card.card_id).map((dep, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {dep.depends_on} (уровень: {dep.level})
              {onDeleteDep && (
                <Button onClick={() => onDeleteDep(card.card_id, dep.depends_on)} className="bg-red-400 text-white px-2 py-1 text-xs">Удалить</Button>
              )}
            </li>
          ))}
        </ul>
      )}
      {depError && <div className="text-red-600 text-xs">{depError}</div>}
    </div>
    <div className="mt-auto flex gap-2 flex-wrap">
      <Button onClick={() => onEdit(card)} className="bg-yellow-500 text-white">Редактировать</Button>
      <Button onClick={() => onDelete(card.card_id)} className="bg-red-600 text-white">Удалить</Button>
      <Button onClick={() => onAddDep(card.card_id)} className="bg-green-600 text-white">Добавить зависимость</Button>
    </div>
  </div>
);

export default UpgradeCard; 