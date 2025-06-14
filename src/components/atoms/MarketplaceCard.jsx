import React from "react";
import Button from "./Button";

const MarketplaceCard = ({ card, onDelete }) => (
  <div className="border rounded p-4 shadow bg-white flex flex-col gap-2">
    <div className="font-bold text-lg">{card.title}</div>
    <div className="text-gray-600 text-sm">Описание: {card.description}</div>
    <div className="text-gray-600 text-sm">Цена: {card.price} монет</div>
    <div className="text-gray-600 text-sm">Владелец: {card.owner_name || card.owner}</div>
    <div className="text-gray-600 text-sm">Статус: {card.active ? 'Активна' : 'Неактивна'}</div>
    <div className="flex gap-2 mt-2">
      <Button onClick={onDelete} className="bg-red-600 text-white">Удалить</Button>
    </div>
  </div>
);

export default MarketplaceCard; 