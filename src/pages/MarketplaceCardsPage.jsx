import React, { useEffect, useState } from "react";
import MarketplaceCardList from "../components/organisms/MarketplaceCardList";
import { getAllMarketplaceCards, deleteMarketplaceCard } from "../services/businessService";

const MarketplaceCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllMarketplaceCards();
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

  const handleDelete = async (card) => {
    if (!window.confirm("Удалить карточку?")) return;
    try {
      await deleteMarketplaceCard(card.cid);
      fetchCards();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка удаления карточки");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Карточки маркетплейса</h1>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && (
        <MarketplaceCardList cards={cards} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default MarketplaceCardsPage; 