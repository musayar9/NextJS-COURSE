import Link from "next/link";
import React from "react";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-blue-900 p-2">
      <h1 className="text-2xl font-bold">settings layout</h1>
      <div className="flex gap-2">
        <div className="w-[200px] h-[500px] bg-orange-700 p-2">
          <h2 className="text-xl font-bold">Settings</h2>

          <nav>
            <ul>
              <li>
                <Link href="/settings">General</Link>
              </li>
              <li>
                <Link href="/settings/profile">Profile</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
