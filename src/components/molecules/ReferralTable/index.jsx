import React from 'react';

export const ReferralTable = ({ referrals, loading, error }) => {
  if (loading) return <div>Загрузка...</div>;
  if (error) return <span className="text-red-600">{error}</span>;
  if (referrals.length === 0) return <div className="text-gray-500">Нет рефералов</div>;

  return (
    <div className="max-h-48 overflow-y-auto">
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
    </div>
  );
}; 