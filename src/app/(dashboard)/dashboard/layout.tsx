import Link from "next/link";
import React from "react";

const DashboardLayout = ({
  children,
  analytics,
  users,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  users: React.ReactNode;
}) => {
  return (
    <div className="bg-green-700 p-2">
      <h1 className="text-2xl font-bold text-white p-4">Dashboard Layout</h1>

      <div className="space-x-2">
        <Link href={"/dashboard"}>Home</Link>
        <Link href={"/dashboard/revenue"}>Revenue</Link>
      </div>
      {children}
      {analytics}
      {users}
    </div>
  );
};

export default DashboardLayout;
