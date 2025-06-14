import React from "react";
import MarketplaceCard from "../atoms/MarketplaceCard";
import Button from "../atoms/Button";

const MarketplaceCardList = ({ cards, onDelete, onPromoClick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {cards.map((card) => (
      <div key={card.cid} className="relative">
        <MarketplaceCard card={card} onDelete={() => onDelete(card)} />
        {onPromoClick && (
          <Button onClick={() => onPromoClick(card)} className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1">Промокоды</Button>
        )}
      </div>
    ))}
  </div>
);

export default MarketplaceCardList; 