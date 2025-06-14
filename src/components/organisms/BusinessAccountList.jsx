import React from "react";
import BusinessAccountCard from "../atoms/BusinessAccountCard";

const BusinessAccountList = ({ businesses, passwords = {}, onBan, onDelete }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {businesses.map((business) => (
      <BusinessAccountCard
        key={business.bid}
        business={business}
        password={passwords[business.bid]}
        onBan={() => onBan(business)}
        onDelete={() => onDelete(business)}
        isBanned={!business.active}
      />
    ))}
  </div>
);

export default BusinessAccountList; 