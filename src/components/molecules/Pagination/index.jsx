import React from 'react';

export const Pagination = ({ currentPage, onPageChange, hasMore }) => (
  <div className="flex justify-end gap-2 mt-2">
    <button
      onClick={() => onPageChange(Math.max(0, currentPage - 1))}
      disabled={currentPage === 0}
      className="px-2 py-1 text-sm border rounded disabled:opacity-50"
    >
      Назад
    </button>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={!hasMore}
      className="px-2 py-1 text-sm border rounded disabled:opacity-50"
    >
      Вперед
    </button>
  </div>
); 