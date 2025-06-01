import React, { useState } from "react";
import Sidebar from "../organisms/Sidebar";
import Toolbar from "../organisms/Toolbar";
import Button from "../atoms/Button";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden p-2">
          <Button onClick={() => setSidebarOpen(true)} className="bg-gray-900 text-white p-2">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </Button>
        </div>
        <Toolbar />
        <main className="flex-1 overflow-auto bg-gray-50 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout; 