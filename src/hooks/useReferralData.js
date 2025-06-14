import { useState, useEffect } from 'react';
import * as api from '../services/upgradeCardsService';

export const useReferralData = (uid, isOpen) => {
  const [link, setLink] = useState(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState(null);
  
  const [income, setIncome] = useState(null);
  const [incomeLoading, setIncomeLoading] = useState(false);
  const [incomeError, setIncomeError] = useState(null);
  
  const [referrals, setReferrals] = useState([]);
  const [referralsLoading, setReferralsLoading] = useState(false);
  const [referralsError, setReferralsError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const itemsPerPage = 10;

  const fetchLink = async () => {
    setLinkLoading(true);
    setLinkError(null);
    try {
      const { data } = await api.getReferralLink(uid);
      setLink(data);
    } catch (e) {
      setLinkError(e.response?.data?.detail || "Ошибка получения ссылки");
    } finally {
      setLinkLoading(false);
    }
  };

  const fetchIncome = async () => {
    setIncomeLoading(true);
    setIncomeError(null);
    try {
      const { data } = await api.getReferralIncome(uid);
      setIncome(data);
    } catch (e) {
      setIncomeError(e.response?.data?.detail || "Ошибка получения дохода");
    } finally {
      setIncomeLoading(false);
    }
  };

  const fetchReferrals = async () => {
    setReferralsLoading(true);
    setReferralsError(null);
    try {
      const { data } = await api.listReferrals({ 
        master_uid: uid,
        offset: currentPage * itemsPerPage,
        limit: itemsPerPage,
        level: selectedLevel,
        provider: 'postgres'
      });
      setReferrals(data);
    } catch (e) {
      setReferralsError(e.response?.data?.detail || "Ошибка получения списка рефералов");
    } finally {
      setReferralsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && uid) {
      fetchLink();
      fetchReferrals();
      fetchIncome();
    }
  }, [isOpen, uid, currentPage, selectedLevel]);

  return {
    link: { data: link, loading: linkLoading, error: linkError },
    income: { data: income, loading: incomeLoading, error: incomeError },
    referrals: { 
      data: referrals, 
      loading: referralsLoading, 
      error: referralsError,
      currentPage,
      setCurrentPage,
      selectedLevel,
      setSelectedLevel,
      itemsPerPage
    }
  };
}; 