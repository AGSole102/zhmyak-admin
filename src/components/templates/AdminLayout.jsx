import React from "react";
import Sidebar from "../organisms/Sidebar";
import Toolbar from "../organisms/Toolbar";

const AdminLayout = ({ children }) => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <Toolbar />
      <main className="flex-1 overflow-auto bg-gray-50 p-8">{children}</main>
    </div>
  </div>
);

export default AdminLayout; 