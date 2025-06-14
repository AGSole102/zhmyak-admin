import React, { useState } from 'react';
import Button from '../atoms/Button';

const initialForm = { tgid: "", tg_username: "", is_active: true };

const CreateUserForm = ({ onSubmit, error }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      tgid: form.tgid ? Number(form.tgid) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="tgid"
        type="number"
        value={form.tgid}
        onChange={handleChange}
        placeholder="TGID"
        className="border rounded px-3 py-2"
        required
      />
      <input
        name="tg_username"
        value={form.tg_username}
        onChange={handleChange}
        placeholder="Имя пользователя в Telegram"
        className="border rounded px-3 py-2"
      />
      <label className="flex items-center gap-2">
        <input
          name="is_active"
          type="checkbox"
          checked={form.is_active}
          onChange={handleChange}
        />
        Активен
      </label>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <Button type="submit" className="bg-blue-600 text-white mt-2">
        Создать
      </Button>
    </form>
  );
};

export default CreateUserForm; 