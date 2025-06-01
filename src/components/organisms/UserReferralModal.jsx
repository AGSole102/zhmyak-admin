import React, { useEffect, useState } from "react";
import * as api from "../../services/upgradeCardsService";
import Modal from "../molecules/Modal";

const UserReferralModal = ({ open, onClose, user }) => {
  const [link, setLink] = useState(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [referralsLoading, setReferralsLoading] = useState(false);
  const [referralsError, setReferralsError] = useState(null);
  const [income, setIncome] = useState(null);
  const [incomeLoading, setIncomeLoading] = useState(false);
  const [incomeError, setIncomeError] = useState(null);
  const [chain, setChain] = useState([]);
  const [chainLoading, setChainLoading] = useState(false);
  const [chainError, setChainError] = useState(null);

  useEffect(() => {
    if (open && user?.uid) {
      fetchLink();
      fetchReferrals();
      fetchIncome();
      fetchChain();
    }
    // eslint-disable-next-line
  }, [open, user?.uid]);

  const fetchLink = async () => {
    setLinkLoading(true);
    setLinkError(null);
    try {
      const { data } = await api.getReferralLink(user.uid);
      setLink(data);
    } catch (e) {
      setLinkError(e.response?.data?.detail || "Ошибка получения ссылки");
    } finally {
      setLinkLoading(false);
    }
  };
  const fetchReferrals = async () => {
    setReferralsLoading(true);
    setReferralsError(null);
    try {
      const { data } = await api.listReferrals({ master_uid: user.uid });
      setReferrals(data);
    } catch (e) {
      setReferralsError(e.response?.data?.detail || "Ошибка получения списка рефералов");
    } finally {
      setReferralsLoading(false);
    }
  };
  const fetchIncome = async () => {
    setIncomeLoading(true);
    setIncomeError(null);
    try {
      const { data } = await api.getReferralIncome(user.uid);
      setIncome(data);
    } catch (e) {
      setIncomeError(e.response?.data?.detail || "Ошибка получения дохода");
    } finally {
      setIncomeLoading(false);
    }
  };
  const fetchChain = async () => {
    setChainLoading(true);
    setChainError(null);
    try {
      const { data } = await api.getMasterChain(user.uid);
      setChain(data);
    } catch (e) {
      setChainError(e.response?.data?.detail || "Ошибка получения цепочки");
    } finally {
      setChainLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Рефералы пользователя"
      maxWidth="2xl"
    >
      {/* Ссылка */}
      <div className="mb-4">
        <b>Реферальная ссылка:</b><br/>
        {linkLoading ? "Загрузка..." : linkError ? <span className="text-red-600">{linkError}</span> : link && (
          <div>
            <div className="break-all">{link.referral_link}</div>
            <div className="text-xs text-gray-500">Код: {link.referral_code}</div>
          </div>
        )}
      </div>
      {/* Доход */}
      <div className="mb-4">
        <b>Доход по рефералам:</b><br/>
        {incomeLoading ? "Загрузка..." : incomeError ? <span className="text-red-600">{incomeError}</span> : income && (
          <div>
            <span className="font-bold">{income.summarized_coin_value}</span> монет
          </div>
        )}
      </div>
      {/* Список рефералов */}
      <div className="mb-4">
        <b>Список рефералов:</b><br/>
        {referralsLoading ? "Загрузка..." : referralsError ? <span className="text-red-600">{referralsError}</span> : (
          <div className="max-h-48 overflow-y-auto">
            {referrals.length === 0 ? <div className="text-gray-500">Нет рефералов</div> : (
              <table className="min-w-full text-xs border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1">UID</th>
                    <th className="px-2 py-1">Уровень</th>
                    <th className="px-2 py-1">Монет</th>
                    <th className="px-2 py-1">Дата</th>
                    <th className="px-2 py-1">Есть свои?</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((r, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-2 py-1">{r.referral?.uid}</td>
                      <td className="px-2 py-1">{r.level}</td>
                      <td className="px-2 py-1">{r.coin_summary}</td>
                      <td className="px-2 py-1">{r.created_at ? r.created_at.split("T")[0] : "-"}</td>
                      <td className="px-2 py-1">{r.has_refs ? "Да" : "Нет"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      {/* Мастер-цепочка */}
      <div className="mb-4">
        <b>Мастер-цепочка:</b><br/>
        {chainLoading ? "Загрузка..." : chainError ? <span className="text-red-600">{chainError}</span> : (
          <div>
            {chain.map((uid, idx) => (
              <div key={idx} className="flex items-center">
                {idx > 0 && <span className="mx-2">→</span>}
                <span>{uid}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserReferralModal; 