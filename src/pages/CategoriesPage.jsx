import React, { useEffect, useState } from "react";
import CategoryList from "../components/organisms/CategoryList";
import CategoryForm from "../components/molecules/CategoryForm";
import Modal from "../components/molecules/Modal";
import Button from "../components/atoms/Button";
import {
  createCategory,
  updateCategory,
  deleteCategory
} from "../services/businessService";
import axios from "../../axiosinstance";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState(null);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/market/tags/", { params: { locale: "ru-RU" } });
      setCategories(res.data.tags);
    } catch (e) {
      setError(e.response?.data?.detail || "Ошибка загрузки категорий");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (data) => {
    setFormError(null);
    try {
      await createCategory(data);
      setShowModal(false);
      fetchCategories();
    } catch (e) {
      setFormError(e.response?.data?.detail || "Ошибка создания категории");
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const handleUpdate = async (data) => {
    setFormError(null);
    try {
      await updateCategory({ ...data, name: editCategory.name });
      setShowModal(false);
      setEditCategory(null);
      fetchCategories();
    } catch (e) {
      setFormError(e.response?.data?.detail || "Ошибка обновления категории");
    }
  };

  const handleDelete = async (category) => {
    if (!window.confirm("Удалить категорию?")) return;
    try {
      await deleteCategory(category.name);
      fetchCategories();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка удаления категории");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Категории товаров</h1>
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={() => { setEditCategory(null); setShowModal(true); }} className="bg-blue-600 text-white">Создать категорию</Button>
      </div>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && (
        <CategoryList categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <Modal open={showModal} onClose={() => { setShowModal(false); setEditCategory(null); }} title={editCategory ? "Редактировать категорию" : "Создать категорию"} maxWidth="sm">
        <CategoryForm onSubmit={editCategory ? handleUpdate : handleCreate} error={formError} category={editCategory} />
      </Modal>
    </div>
  );
};

export default CategoriesPage; 