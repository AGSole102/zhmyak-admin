import React, { useState } from "react";

const initialState = {
  dependency_type: "Dependency",
  depends_on: "",
  level: 0,
  friend_count: 0,
};

const DependencyForm = ({ initial = initialState, onSubmit, onCancel, cardOptions = [] }) => {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.depends_on) {
      setError("Выберите зависимую карточку");
      return;
    }
    setError(null);
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        Зависимая карточка
        <select
          name="depends_on"
          value={form.depends_on}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        >
          <option value="">Выберите карточку</option>
          {cardOptions.map((c) => (
            <option key={c.card_id} value={c.card_id}>{c.name}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        Уровень
        <input
          name="level"
          type="number"
          value={form.level}
          onChange={handleChange}
          placeholder="Уровень"
          className="border rounded px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1">
        Количество друзей (опционально)
        <input
          name="friend_count"
          type="number"
          value={form.friend_count}
          onChange={handleChange}
          placeholder="Количество друзей (опционально)"
          className="border rounded px-3 py-2"
        />
      </label>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Сохранить</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">Отмена</button>
      </div>
    </form>
  );
};

export default DependencyForm; 