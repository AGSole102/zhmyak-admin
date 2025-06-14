import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";

const CategoryForm = ({ onSubmit, error, category }) => {
  const [name, setName] = useState(category?.name || "");
  const [active, setActive] = useState(category?.active ?? true);
  const [parent_name, setParentName] = useState(category?.parent_name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, active, parent_name: parent_name || null });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input placeholder="Название" value={name} onChange={e => setName(e.target.value)} required />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} />
        Активна
      </label>
      <Input placeholder="Родитель (опционально)" value={parent_name} onChange={e => setParentName(e.target.value)} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="submit" className="bg-blue-600 text-white">{category ? 'Сохранить' : 'Создать категорию'}</Button>
    </form>
  );
};

export default CategoryForm; 