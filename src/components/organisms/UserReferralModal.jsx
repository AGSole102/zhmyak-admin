import React from "react";
import Modal from "../molecules/Modal";
import { ReferralLink } from "../atoms/ReferralLink";
import { ReferralIncome } from "../atoms/ReferralIncome";
import { ReferralTable } from "../molecules/ReferralTable";
import { Pagination } from "../molecules/Pagination";
import { LevelFilter } from "../atoms/LevelFilter";
import { useReferralData } from "../../hooks/useReferralData";

const UserReferralModal = ({ open, onClose, user }) => {
  const { 
    link,
    income,
    referrals: {
      data: referralsData,
      loading: referralsLoading,
      error: referralsError,
      currentPage,
      setCurrentPage,
      selectedLevel,
      setSelectedLevel,
      itemsPerPage
    }
  } = useReferralData(user?.uid, open);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Рефералы пользователя"
      maxWidth="2xl"
    >
      <ReferralLink {...link} />
      <ReferralIncome {...income} />
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <b>Список рефералов:</b>
          <LevelFilter 
            value={selectedLevel} 
            onChange={setSelectedLevel}
          />
          </div>
        
        <ReferralTable 
          referrals={referralsData}
          loading={referralsLoading}
          error={referralsError}
        />
        
        <Pagination 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          hasMore={referralsData.length >= itemsPerPage}
        />
      </div>
    </Modal>
  );
};

export default UserReferralModal; 