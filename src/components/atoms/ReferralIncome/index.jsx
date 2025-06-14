import React from 'react';

export const ReferralIncome = ({ income, loading, error }) => (
  <div className="mb-4">
    <b>Доход по рефералам:</b><br/>
    {loading ? "Загрузка..." : error ? (
      <span className="text-red-600">{error}</span>
    ) : income && (
      <div>
        <span className="font-bold">{income.summarized_coin_value}</span> монет
      </div>
    )}
  </div>
); 