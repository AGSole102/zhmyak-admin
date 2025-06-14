import React from "react";
import Button from "./Button";

const CategoryCard = ({ category, onEdit, onDelete }) => (
  <div className="border rounded p-4 shadow bg-white flex flex-col gap-2">
    <div className="font-bold text-lg">{category.name}</div>
    <div className="text-gray-600 text-sm">Активна: {category.active ? 'Да' : 'Нет'}</div>
    {category.parent_name && <div className="text-gray-600 text-sm">Родитель: {category.parent_name}</div>}
    <div className="flex gap-2 mt-2">
      <Button onClick={onEdit} className="bg-blue-600 text-white">Редактировать</Button>
      <Button onClick={onDelete} className="bg-red-600 text-white">Удалить</Button>
    </div>
  </div>
);

export default CategoryCard; 