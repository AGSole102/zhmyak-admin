import React from 'react';

export const ReferralLink = ({ link, loading, error }) => (
  <div className="mb-4">
    <b>Реферальная ссылка:</b><br/>
    {loading ? "Загрузка..." : error ? (
      <span className="text-red-600">{error}</span>
    ) : link && (
      <div>
        <div className="break-all">{link.referral_link}</div>
        <div className="text-xs text-gray-500">Код: {link.referral_code}</div>
      </div>
    )}
  </div>
); 