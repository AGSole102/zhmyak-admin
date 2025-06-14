import { useState, useCallback } from "react";
import * as api from "../services/upgradeCardsService";

const initialForm = {
  title: "",
  reward: 0,
  task_type: "telegram",
  image: "",
  link: "",
  ttl: 0,
};

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [modalError, setModalError] = useState(null);

  const fetchTasks = useCallback(async () => {
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
  }, []);

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
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError(null);
    // Валидация ссылки
    let link = String(form.link).trim();
    if (link && !/^https?:\/\//.test(link)) {
      // Если пользователь ввёл только домен, добавляем https://
      if (/^[\w.-]+\.[a-z]{2,}/i.test(link)) {
        link = "https://" + link;
      } else {
        setModalError("Ссылка должна начинаться с http:// или https://");
        return;
      }
    }
    try {
      const payload = {
        title: String(form.title),
        reward: Number(form.reward),
        task_type: String(form.task_type),
        image: "",
        link,
        ttl: form.ttl === "" ? null : Number(form.ttl),
      };
      await api.createTask(payload);
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

  return {
    tasks,
    loading,
    error,
    showModal,
    form,
    modalError,
    openModal,
    closeModal,
    handleChange,
    handleSubmit,
    handleDelete,
    fetchTasks,
    setForm,
  };
}; 