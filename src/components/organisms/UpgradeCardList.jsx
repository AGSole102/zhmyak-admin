import React from "react";
import UpgradeCard from "../molecules/UpgradeCard";

const UpgradeCardList = ({
  cards,
  dependencies,
  depLoading,
  depError,
  onEdit,
  onDelete,
  onAddDep,
  onDeleteDep,
  getCardDependencies
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {cards.map((card) => (
      <UpgradeCard
        key={card.card_id}
        card={card}
        dependencies={dependencies}
        depLoading={depLoading}
        depError={depError}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddDep={onAddDep}
        onDeleteDep={onDeleteDep}
        getCardDependencies={getCardDependencies}
      />
    ))}
  </div>
);

export default UpgradeCardList; 