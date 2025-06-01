import React, { useState } from "react";
import Sidebar from "../organisms/Sidebar";
import Toolbar from "../organisms/Toolbar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Toolbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto bg-gray-50 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout; 