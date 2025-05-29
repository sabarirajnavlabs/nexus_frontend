"use client";

import { useState, useCallback } from "react";
import AdminSidebar from "../components/AdminSidebar";
import OrganizationManagement from "../components/OrganizationManagement";
import UserInvitation from "../components/UserInvitation";
import { Spin } from "antd";

export default function AdminDashboard() {
  const [selected, setSelected] = useState("organizations");
  const [loading, setLoading] = useState(false);

  // Handler to wrap tab switches with loading
  const handleSelect = useCallback((key) => {
    setLoading(true);
    setSelected(key);
    // Simulate loading for UX (replace with real API loading if needed)
    setTimeout(() => setLoading(false), 400); // 400ms spinner
  }, []);

  // Pass loading control to children for API actions
  const childProps = {
    setLoading,
    loading,
  };

  let content;
  if (selected === "organizations") {
    content = <OrganizationManagement {...childProps} />;
  } else if (selected === "invites") {
    content = <UserInvitation {...childProps} />;
    }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar selected={selected} onSelect={handleSelect} />
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-2 px-2 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Spin spinning={loading} size="large">
            {content}
          </Spin>
        </div>
      </main>
    </div>
  );
} 