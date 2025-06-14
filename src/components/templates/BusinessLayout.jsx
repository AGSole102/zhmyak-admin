import React, { useState } from "react";
import BusinessSidebar from "../organisms/BusinessSidebar";
import Toolbar from "../organisms/Toolbar";

const BusinessLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen">
      <BusinessSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Toolbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto bg-gray-50 p-8">{children}</main>
      </div>
    </div>
  );
};

export default BusinessLayout; 