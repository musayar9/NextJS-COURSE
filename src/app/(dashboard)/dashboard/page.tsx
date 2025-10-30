import React from "react";
import { auth, requireLogin } from "../../../auth";


const DashboardPage = async () => {
await requireLogin()
  return (
    <div className="bg-purple-700 p-2 h-full">
      <h1 className="text-2xl font-bold">Dashboard Page</h1>
    </div>
  );
};

export default DashboardPage;
