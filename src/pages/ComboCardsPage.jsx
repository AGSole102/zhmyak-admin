import React, { useState } from "react";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import UpgradeCardForm from "../components/organisms/UpgradeCardForm";
import DependencyForm from "../components/organisms/DependencyForm";
import UpgradeCardList from "../components/organisms/UpgradeCardList";
import { useUpgradeCardsData } from "../hooks/useUpgradeCardsData";

const ComboCardsPage = () => {
  const {
    cards,
    dependencies,
    loading,
    error,
    combo,
    comboLoading,
    comboError,
    comboStatus,
    comboCompletion,
    comboCompletionLoading,
    comboCompletionError,
    fetchAllData,
    fetchComboCompletion,
    createCard,
    updateCard,
    deleteCard,
    createDep,
    deleteDep,
  } = useUpgradeCardsData();

  const [showCardModal, setShowCardModal] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [showDepModal, setShowDepModal] = useState(false);
  const [depCardId, setDepCardId] = useState(null);
  const [comboForm, setComboForm] = useState({ card1: "", card2: "", card3: "" });
  const [comboCompletionUid, setComboCompletionUid] = useState("");

  const getCardDependencies = (card_id) => dependencies.filter((d) => d.card_id === card_id);

  // --- CRUD карточек ---
  const handleCreateCard = async (form) => {
    try {
      await createCard(form);
      setShowCardModal(false);
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
      await updateCard(form);
      setShowCardModal(false);
      setEditCard(null);
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка обновления карточки");
    }
  };
  const handleDeleteCard = async (card_id) => {
    if (!window.confirm("Удалить карточку?")) return;
    try {
      await deleteCard(card_id);
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка удаления карточки");
    }
  };
  // --- CRUD зависимостей ---
  const handleAddDep = (card_id) => {
    setDepCardId(card_id);
    setShowDepModal(true);
  };
  const handleCreateDep = async (form) => {
    try {
      await createDep(depCardId, form);
      setShowDepModal(false);
      setDepCardId(null);
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка создания зависимости");
    }
  };
  const handleDeleteDep = async (card_id, depends_on) => {
    if (!window.confirm("Удалить зависимость?")) return;
    try {
      await deleteDep(card_id, depends_on);
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка удаления зависимости");
    }
  };
  // --- Комбо ---
  const handleComboChange = (e) => {
    const { name, value } = e.target;
    setComboForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreateCombo = async (e) => {
    e.preventDefault();
    // TODO: реализовать createCombo через useUpgradeCardsData если потребуется
    // await createCombo(comboForm);
    fetchAllData();
  };
  const handleComboCompletion = async (e) => {
    e.preventDefault();
    fetchComboCompletion(comboCompletionUid);
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
        <UpgradeCardList
          cards={cards}
          dependencies={dependencies}
          depLoading={false}
          depError={null}
          onEdit={handleEditCard}
          onDelete={handleDeleteCard}
          onAddDep={handleAddDep}
          onDeleteDep={handleDeleteDep}
          getCardDependencies={getCardDependencies}
        />
      )}
      {/* Модалка карточки */}
      <Modal
        open={showCardModal || !!editCard}
        onClose={() => { setShowCardModal(false); setEditCard(null); }}
        title={editCard ? "Редактировать карточку" : "Создать карточку"}
      >
        <UpgradeCardForm
          initial={editCard || undefined}
          isEdit={!!editCard}
          onSubmit={editCard ? handleUpdateCard : handleCreateCard}
          onCancel={() => { setShowCardModal(false); setEditCard(null); }}
        />
      </Modal>
      {/* Модалка зависимости */}
      <Modal
        open={showDepModal}
        onClose={() => { setShowDepModal(false); setDepCardId(null); }}
        title="Добавить зависимость"
      >
        <DependencyForm
          cardOptions={cards.filter(c => c.card_id !== depCardId)}
          onSubmit={handleCreateDep}
          onCancel={() => { setShowDepModal(false); setDepCardId(null); }}
        />
      </Modal>
      {/* Комбо блок */}
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