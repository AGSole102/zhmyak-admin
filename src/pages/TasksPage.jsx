import React, { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import * as api from "../services/upgradeCardsService";
import ImageWithFallback from "../components/atoms/ImageWithFallback";

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
            <div key={task.id} className="bg-white rounded shadow p-4 flex flex-col h-full">
              <div className="font-bold text-lg mb-2 break-words">{task.title}</div>
              <div className="mb-2">Награда: {task.reward}</div>
              <div className="mb-2">Тип: {task.task_type}</div>
              <div className="mb-2 break-all">
                Ссылка: <a href={task.link} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">{task.link}</a>
              </div>
              {task.image && (
                <div className="mb-2 flex-shrink-0">
                  <ImageWithFallback 
                    src={task.image.startsWith("http") ? task.image : `https://quackit.ru:8443/images/tasks/${task.image}`}
                    alt={task.title}
                    className="w-32 h-32 object-contain"
                  />
                </div>
              )}
              <div className="mt-auto pt-4 flex gap-2">
                <Button onClick={() => handleDelete(task.id)} className="bg-red-600 text-white">Удалить</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal
        open={showModal}
        onClose={closeModal}
        title="Создать задание"
      >
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
            Изображение
            <input
              name="image"
              type="file"
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </label>
          <label className="flex flex-col gap-1">
            TTL (время жизни)
            <input
              name="ttl"
              type="number"
              value={form.ttl}
              onChange={handleChange}
              placeholder="Время жизни в секундах"
              className="border rounded px-3 py-2"
            />
          </label>
          {modalError && <div className="text-red-600 text-sm">{modalError}</div>}
          <Button type="submit" className="bg-blue-600 text-white mt-2">
            Создать
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default TasksPage; 