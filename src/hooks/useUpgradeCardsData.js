import { useState, useCallback, useEffect } from 'react';
import * as api from '../services/upgradeCardsService';

export const useUpgradeCardsData = () => {
  const [cards, setCards] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [combo, setCombo] = useState([]);
  const [comboLoading, setComboLoading] = useState(false);
  const [comboError, setComboError] = useState(null);
  const [comboStatus, setComboStatus] = useState("");
  const [comboCompletion, setComboCompletion] = useState(null);
  const [comboCompletionLoading, setComboCompletionLoading] = useState(false);
  const [comboCompletionError, setComboCompletionError] = useState(null);

  // Новый метод: загружает все данные одним Promise.all
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [cardsRes, depsRes, comboRes, comboStatusRes] = await Promise.all([
        api.getUpgrades(),
        api.getDependencies(),
        api.getCombo(),
        api.getComboStatus(),
      ]);
      setCards(cardsRes.data);
      setDependencies(depsRes.data);
      setCombo(comboRes.data);
      setComboStatus(comboStatusRes.data);
    } catch (e) {
      setError(e.response?.data?.detail || "Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Оставляю старые методы для частичного обновления
  const fetchAll = useCallback(async () => {
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
  }, []);

  const fetchCombo = useCallback(async () => {
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
  }, []);

  const fetchComboStatus = useCallback(async () => {
    try {
      const { data } = await api.getComboStatus();
      setComboStatus(data);
    } catch {}
  }, []);

  const fetchComboCompletion = useCallback(async (uid) => {
    setComboCompletionLoading(true);
    setComboCompletionError(null);
    setComboCompletion(null);
    try {
      const { data } = await api.getComboCompletion(uid);
      setComboCompletion(data);
    } catch (e) {
      setComboCompletionError(e.response?.data?.detail || "Ошибка загрузки combo_completion");
    } finally {
      setComboCompletionLoading(false);
    }
  }, []);

  // CRUD карточек
  const createCard = async (form) => {
    await api.createUpgrade(form);
    await fetchAllData();
  };
  const updateCard = async (form) => {
    await api.updateUpgrade(form.card_id, form);
    await fetchAllData();
  };
  const deleteCard = async (card_id) => {
    await api.deleteUpgrade(card_id);
    await fetchAllData();
  };

  // CRUD зависимостей
  const createDep = async (card_id, form) => {
    await api.createDependency(card_id, form);
    await fetchAllData();
  };
  const deleteDep = async (card_id, depends_on) => {
    await api.deleteDependency(card_id, depends_on);
    await fetchAllData();
  };

  return {
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
    fetchAll,
    fetchCombo,
    fetchComboStatus,
    fetchComboCompletion,
    fetchAllData, // новый метод
    createCard,
    updateCard,
    deleteCard,
    createDep,
    deleteDep,
  };
}; 