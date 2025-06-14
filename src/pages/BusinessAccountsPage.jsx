import React, { useEffect, useState } from "react";
import BusinessAccountList from "../components/organisms/BusinessAccountList";
import BusinessAccountForm from "../components/molecules/BusinessAccountForm";
import Modal from "../components/molecules/Modal";
import Button from "../components/atoms/Button";
import {
  registerBusiness,
  getAllBusinesses,
  banBusiness
} from "../services/businessService";

const BusinessAccountsPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState(null);
  const [passwords, setPasswords] = useState({});

  const fetchBusinesses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllBusinesses();
      setBusinesses(res.data.businesses);
    } catch (e) {
      setError(e.response?.data?.detail || "Ошибка загрузки бизнесов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleCreate = async (data) => {
    setFormError(null);
    try {
      const res = await registerBusiness(data);
      setPasswords((prev) => ({ ...prev, [res.data.bid]: res.data.password }));
      setShowModal(false);
      fetchBusinesses();
    } catch (e) {
      setFormError(e.response?.data?.detail || "Ошибка создания бизнеса");
    }
  };

  const handleBan = async (business) => {
    try {
      await banBusiness(business.bid);
      fetchBusinesses();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка бана бизнеса");
    }
  };

  const handleDelete = async (business) => {
    // TODO: реализовать удаление бизнеса, если появится эндпоинт
    alert("Удаление бизнеса не реализовано (нет эндпоинта)");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Бизнес-аккаунты</h1>
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={() => setShowModal(true)} className="bg-blue-600 text-white">Зарегистрировать бизнес</Button>
      </div>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && (
        <BusinessAccountList
          businesses={businesses}
          passwords={passwords}
          onBan={handleBan}
          onDelete={handleDelete}
        />
      )}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Регистрация бизнеса" maxWidth="sm">
        <BusinessAccountForm onSubmit={handleCreate} error={formError} />
      </Modal>
    </div>
  );
};

export default BusinessAccountsPage; 