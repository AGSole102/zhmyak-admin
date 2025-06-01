import React, { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import * as api from "../services/upgradeCardsService";

const initialForm = {
  title: "",
  reward: 0,
  task_type: "telegram",
  image: "",
  link: "",
  ttl: 0,
};

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.getTasks();
      setTasks(data);
    } catch (e) {
      setError(e.response?.data?.detail || "Ошибка загрузки задач");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setForm(initialForm);
    setShowModal(true);
    setModalError(null);
  };
  const closeModal = () => {
    setShowModal(false);
    setForm(initialForm);
    setModalError(null);
  };
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0].name }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError(null);
    try {
      await api.createTask(form);
      closeModal();
      fetchTasks();
    } catch (e) {
      setModalError(e.response?.data?.detail || "Ошибка создания задачи");
    }
  };
  const handleDelete = async (task_id) => {
    if (!window.confirm("Удалить задачу?")) return;
    try {
      await api.deleteTask(task_id);
      fetchTasks();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка удаления задачи");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Задания</h1>
      <div className="mb-4">
        <Button onClick={openModal} className="bg-blue-600 text-white">Создать задание</Button>
      </div>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded shadow p-4 flex flex-col">
              <div className="font-bold text-lg mb-2">{task.title}</div>
              <div className="mb-2">Награда: {task.reward}</div>
              <div className="mb-2">Тип: {task.task_type}</div>
              <div className="mb-2">Ссылка: <a href={task.link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{task.link}</a></div>
              {task.image && (
                <img src={task.image.startsWith("http") ? task.image : `https://quackit.ru:8443/images/tasks/${task.image}`} alt={task.title} className="w-32 h-32 object-contain mb-2" />
              )}
              <div className="mt-auto flex gap-2">
                <Button onClick={() => handleDelete(task.id)} className="bg-red-600 text-white">Удалить</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded shadow p-8 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">×</button>
            <h2 className="text-xl font-bold mb-4">Создать задание</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                Название
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                >
                  <option value="telegram">telegram</option>
                  <option value="instant">instant</option>
                  <option value="delayed">delayed</option>
                </select>
              </label>
              <label className="flex flex-col gap-1">
                Картинка
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                />
                {form.image && (
                  <img src={form.image.startsWith("http") ? form.image : `/images/tasks/${form.image}`} alt="preview" className="w-24 h-24 object-contain mt-2 border" />
                )}
              </label>
              <label className="flex flex-col gap-1">
                Ссылка
                <input
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="Ссылка"
                  className="border rounded px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1">
                TTL (сек)
                <input
                  name="ttl"
                  type="number"
                  value={form.ttl}
                  onChange={handleChange}
                  placeholder="TTL (сек)"
                  className="border rounded px-3 py-2"
                />
              </label>
              {modalError && <div className="text-red-600 text-sm">{modalError}</div>}
              <Button type="submit" className="bg-blue-600 text-white mt-2">Создать</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage; 