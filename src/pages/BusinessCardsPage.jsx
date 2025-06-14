import React, { useEffect, useState } from "react";
import { getBusinessCards, createBusinessCard, updateBusinessCard, deleteBusinessCard, getBusinessCardPromos, generateBusinessCardPromos } from "../services/businessService";
import MarketplaceCardList from "../components/organisms/MarketplaceCardList";
import Modal from "../components/molecules/Modal";
import Button from "../components/atoms/Button";
import BusinessCardForm from "../components/molecules/BusinessCardForm";
import PromoCodeList from "../components/organisms/PromoCodeList";

const BusinessCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState(null);
  const [editCard, setEditCard] = useState(null);

  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getBusinessCards();
      setCards(res.data.cards);
    } catch (e) {
      setError(e.response?.data?.detail || "Ошибка загрузки карточек");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCreate = async (data) => {
    setFormError(null);
    try {
      await createBusinessCard(data);
      setShowModal(false);
      fetchCards();
    } catch (e) {
      setFormError(e.response?.data?.detail || "Ошибка создания карточки");
    }
  };

  const handleEdit = (card) => {
    setEditCard(card);
    setShowModal(true);
  };

  const handleUpdate = async (data) => {
    setFormError(null);
    try {
      await updateBusinessCard({ ...data, cid: editCard.cid });
      setShowModal(false);
      setEditCard(null);
      fetchCards();
    } catch (e) {
      setFormError(e.response?.data?.detail || "Ошибка обновления карточки");
    }
  };

  const handleDelete = async (card) => {
    if (!window.confirm("Удалить карточку?")) return;
    try {
      await deleteBusinessCard(card.cid);
      fetchCards();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка удаления карточки");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Мои карточки</h1>
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={() => { setEditCard(null); setShowModal(true); }} className="bg-blue-600 text-white">Создать карточку</Button>
      </div>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && (
        <MarketplaceCardList cards={cards} onDelete={handleDelete} />
      )}
      <Modal open={showModal} onClose={() => { setShowModal(false); setEditCard(null); }} title={editCard ? "Редактировать карточку" : "Создать карточку"} maxWidth="sm">
        <BusinessCardForm onSubmit={editCard ? handleUpdate : handleCreate} error={formError} card={editCard} />
      </Modal>
    </div>
  );
};

export default BusinessCardsPage; 