import React, { useEffect, useState } from "react";
import { getBusinessCards } from "../services/businessService";
import MarketplaceCardList from "../components/organisms/MarketplaceCardList";

const BusinessDashboardPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchCards();
  }, []);

  const totalSold = cards.reduce((sum, c) => sum + (c.sold || 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Дашборд бизнеса</h1>
      <div className="mb-6 flex gap-8">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500 text-sm">Карточек на витрине</div>
          <div className="text-2xl font-bold">{cards.length}</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500 text-sm">Всего продаж</div>
          <div className="text-2xl font-bold">{totalSold}</div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Ваши карточки</h2>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && <MarketplaceCardList cards={cards} onDelete={() => {}} />}
    </div>
  );
};

export default BusinessDashboardPage; 