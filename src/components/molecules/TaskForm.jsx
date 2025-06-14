import React from "react";
import Button from "../atoms/Button";

const TaskForm = ({ form, onChange, onSubmit, onCancel, error }) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-4">
    <label className="flex flex-col gap-1">
      Название
      <input
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Название"
        className="border rounded px-3 py-2"
        required
      />
    </label>
    <label className="flex flex-col gap-1">
      Награда
      <input
        name="reward"
        type="number"
        value={form.reward}
        onChange={onChange}
        placeholder="Награда"
        className="border rounded px-3 py-2"
        required
      />
    </label>
    <label className="flex flex-col gap-1">
      Тип задания
      <select
        name="task_type"
        value={form.task_type}
        onChange={onChange}
        className="border rounded px-3 py-2"
      >
        <option value="telegram">telegram</option>
        <option value="instant">instant</option>
        <option value="delayed">delayed</option>
      </select>
    </label>
    <label className="flex flex-col gap-1">
      Ссылка
      <input
        name="link"
        value={form.link}
        onChange={onChange}
        placeholder="Ссылка"
        className="border rounded px-3 py-2"
      />
    </label>
    <label className="flex flex-col gap-1">
      Изображение
      <input
        name="image"
        type="file"
        onChange={onChange}
        className="border rounded px-3 py-2"
      />
    </label>
    <label className="flex flex-col gap-1">
      TTL (время жизни)
      <input
        name="ttl"
        type="number"
        value={form.ttl}
        onChange={onChange}
        placeholder="Время жизни в секундах"
        className="border rounded px-3 py-2"
      />
    </label>
    {error && <div className="text-red-600 text-sm">{error}</div>}
    <div className="flex gap-2 mt-2">
      <Button type="submit" className="bg-blue-600 text-white">Создать</Button>
      {onCancel && <Button type="button" onClick={onCancel} className="bg-gray-300">Отмена</Button>}
    </div>
  </form>
);

export default TaskForm; 