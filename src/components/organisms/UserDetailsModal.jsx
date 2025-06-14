import React, { useState } from "react";
import Modal from "../molecules/Modal";
import { UserInfo } from "../atoms/UserInfo";
import { UserLevel } from "../atoms/UserLevel";
import { UserEconomy } from "../atoms/UserEconomy";
import { DuckState } from "../atoms/DuckState";
import UserReferralModal from "./UserReferralModal";

const UserDetailsModal = ({ open, onClose, user, levelInfo, economy, duckState, loading, error }) => {
  const [showReferral, setShowReferral] = useState(false);
  
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title="Детали пользователя"
      >
        {loading && <div>Загрузка...</div>}
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        {user && (
          <>
            <UserInfo user={user} />
            <button 
              onClick={() => setShowReferral(true)} 
              className="mb-3 bg-blue-600 text-white px-3 py-1 rounded"
            >
              Рефералы
            </button>
          </>
        )}
        {levelInfo && <UserLevel levelInfo={levelInfo} />}
        {economy && <UserEconomy economy={economy} />}
        {duckState && <DuckState duckState={duckState} />}
      </Modal>
      {showReferral && (
        <UserReferralModal 
          open={showReferral} 
          onClose={() => setShowReferral(false)} 
          user={user} 
        />
      )}
    </>
  );
};

export default UserDetailsModal; 