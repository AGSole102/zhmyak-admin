import React, { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import UpgradeCardForm from "../components/organisms/UpgradeCardForm";
import DependencyForm from "../components/organisms/DependencyForm";
import * as api from "../services/upgradeCardsService";

const ComboCardsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dependencies, setDependencies] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [depError, setDepError] = useState(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [showDepModal, setShowDepModal] = useState(false);
  const [depCardId, setDepCardId] = useState(null);
  const [editDep, setEditDep] = useState(null);
  const [combo, setCombo] = useState([]);
  const [comboLoading, setComboLoading] = useState(false);
  const [comboError, setComboError] = useState(null);
  const [comboForm, setComboForm] = useState({ card1: "", card2: "", card3: "" });
  const [comboStatus, setComboStatus] = useState("");
  const [comboCompletion, setComboCompletion] = useState(null);
  const [comboCompletionUid, setComboCompletionUid] = useState("");
  const [comboCompletionLoading, setComboCompletionLoading] = useState(false);
  const [comboCompletionError, setComboCompletionError] = useState(null);

  useEffect(() => {
    fetchAll();
    fetchCombo();
    fetchComboStatus();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [cardsRes, depsRes] = await Promise.all([
        api.getUpgrades(),
        api.getDependencies(),
      ]);
      setCards(cardsRes.data);
      setDependencies(depsRes.data);
    } catch (e) {
      setError(e.response?.data?.detail || "Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  };

  const fetchCombo = async () => {
    setComboLoading(true);
    setComboError(null);
    try {
      const { data } = await api.getCombo();
      setCombo(data);
    } catch (e) {
      setComboError(e.response?.data?.detail || "Ошибка загрузки комбо");
    } finally {
      setComboLoading(false);
    }
  };

  const fetchComboStatus = async () => {
    try {
      const { data } = await api.getComboStatus();
      setComboStatus(data);
    } catch {}
  };

  const getCardDependencies = (card_id) => dependencies.filter((d) => d.card_id === card_id);

  // --- CRUD карточек ---
  const handleCreateCard = async (form) => {
    try {
      await api.createUpgrade(form);
      setShowCardModal(false);
      fetchAll();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка создания карточки");
    }
  };
  const handleEditCard = (card) => {
    setEditCard(card);
    setShowCardModal(true);
  };
  const handleUpdateCard = async (form) => {
    try {
      await api.updateUpgrade(form.card_id, form);
      setShowCardModal(false);
      setEditCard(null);
      fetchAll();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка обновления карточки");
    }
  };
  const handleDeleteCard = async (card_id) => {
    if (!window.confirm("Удалить карточку?")) return;
    try {
      await api.deleteUpgrade(card_id);
      fetchAll();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка удаления карточки");
    }
  };
  // --- CRUD зависимостей ---
  const handleAddDep = (card_id) => {
    setDepCardId(card_id);
    setEditDep(null);
    setShowDepModal(true);
  };
  const handleCreateDep = async (form) => {
    try {
      const { dependency_type, depends_on, level, friend_count } = form;
      await api.createDependency(depCardId, { dependency_type, depends_on, level, friend_count });
      setShowDepModal(false);
      setDepCardId(null);
      fetchAll();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка создания зависимости");
    }
  };
  // --- Комбо ---
  const handleComboChange = (e) => {
    const { name, value } = e.target;
    setComboForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreateCombo = async (e) => {
    e.preventDefault();
    try {
      await api.createCombo(comboForm);
      fetchCombo();
      fetchComboStatus();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка создания комбо");
    }
  };
  const handleComboCompletion = async (e) => {
    e.preventDefault();
    setComboCompletionLoading(true);
    setComboCompletionError(null);
    setComboCompletion(null);
    try {
      const { data } = await api.getComboCompletion(comboCompletionUid);
      setComboCompletion(data);
    } catch (e) {
      setComboCompletionError(e.response?.data?.detail || "Ошибка загрузки combo_completion");
    } finally {
      setComboCompletionLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Карточки комбо</h1>
      <div className="mb-4">
        <Button onClick={() => { setShowCardModal(true); setEditCard(null); }} className="bg-blue-600 text-white">Создать карточку</Button>
      </div>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.card_id} className="bg-white rounded shadow p-4 flex flex-col">
              <div className="font-bold text-lg mb-2">{card.name["ru-RU"] || card.name}</div>
              <div className="mb-2 text-sm text-gray-500">Тип: {card.card_type}</div>
              <div className="mb-2">Цена: {card.init_price}</div>
              <div className="mb-2">{card.description}</div>
              {card.picture && (
                <img src={"https://quackit.ru:8443/images/business/" + card.card_type + "/" + card.picture} alt={card.name["ru-RU"] || card.name} className="w-32 h-32 object-contain mb-2" />
              )}
              <div className="mb-2">
                <b>Зависимости:</b>
                {depLoading ? (
                  <span>Загрузка...</span>
                ) : (
                  <ul className="list-disc ml-5">
                    {getCardDependencies(card.card_id).length === 0 && <li>Нет</li>}
                    {getCardDependencies(card.card_id).map((dep, idx) => (
                      <li key={idx}>
                        {dep.depends_on} (уровень: {dep.level})
                      </li>
                    ))}
                  </ul>
                )}
                {depError && <div className="text-red-600 text-xs">{depError}</div>}
              </div>
              <div className="mt-auto flex gap-2 flex-wrap">
                <Button onClick={() => handleEditCard(card)} className="bg-yellow-500 text-white">Редактировать</Button>
                <Button onClick={() => handleDeleteCard(card.card_id)} className="bg-red-600 text-white">Удалить</Button>
                <Button onClick={() => handleAddDep(card.card_id)} className="bg-green-600 text-white">Добавить зависимость</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Модалка карточки */}
      {(showCardModal || editCard) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={() => { setShowCardModal(false); setEditCard(null); }}>
          <div className="bg-white rounded shadow p-8 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => { setShowCardModal(false); setEditCard(null); }} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">×</button>
            <h2 className="text-xl font-bold mb-4">{editCard ? "Редактировать карточку" : "Создать карточку"}</h2>
            <UpgradeCardForm
              initial={editCard || undefined}
              isEdit={!!editCard}
              onSubmit={editCard ? handleUpdateCard : handleCreateCard}
              onCancel={() => { setShowCardModal(false); setEditCard(null); }}
            />
          </div>
        </div>
      )}
      {/* Модалка зависимости */}
      {showDepModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={() => { setShowDepModal(false); setDepCardId(null); }}>
          <div className="bg-white rounded shadow p-8 w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => { setShowDepModal(false); setDepCardId(null); }} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">×</button>
            <h2 className="text-xl font-bold mb-4">Добавить зависимость</h2>
            <DependencyForm
              cardOptions={cards.filter(c => c.card_id !== depCardId)}
              onSubmit={handleCreateDep}
              onCancel={() => { setShowDepModal(false); setDepCardId(null); }}
            />
          </div>
        </div>
      )}
      {/* Комбо */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Текущее комбо</h2>
        {comboLoading && <div>Загрузка...</div>}
        {comboError && <div className="text-red-600 mb-2">{comboError}</div>}
        {!comboLoading && !comboError && (
          <div className="mb-4">
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(combo, null, 2)}</pre>
          </div>
        )}
        <form onSubmit={handleComboCompletion} className="flex gap-2 items-end mb-4">
          <input
            type="text"
            value={comboCompletionUid}
            onChange={e => setComboCompletionUid(e.target.value)}
            placeholder="UID пользователя для combo_completion"
            className="border rounded px-3 py-2"
            required
          />
          <Button type="submit" className="bg-blue-600 text-white">Показать combo_completion</Button>
        </form>
        {comboCompletionLoading && <div>Загрузка combo_completion...</div>}
        {comboCompletionError && <div className="text-red-600 mb-2">{comboCompletionError}</div>}
        {comboCompletion && (
          <div className="bg-gray-100 p-4 rounded mb-4">
            <div className="font-bold mb-2">UID: {comboCompletion.uid}</div>
            <div className="font-semibold mb-1">Combo Completion:</div>
            {comboCompletion.combo_completion.length === 0 ? (
              <div className="text-gray-500">Нет данных</div>
            ) : (
              <ul className="list-disc ml-5">
                {comboCompletion.combo_completion.map((el, idx) => (
                  <li key={idx} className="mb-2">
                    <div><b>Место:</b> {el.place}</div>
                    <div><b>Картинка:</b> {el.img}</div>
                    {el.img && <img src={el.img} alt="combo img" className="w-16 h-16 object-contain mt-1" />}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="mt-2 text-sm text-gray-600">Статус комбо: <pre className="inline bg-gray-100 p-1 rounded text-xs">{JSON.stringify(comboStatus, null, 2)}</pre></div>
      </div>
    </div>
  );
};

export default ComboCardsPage; 