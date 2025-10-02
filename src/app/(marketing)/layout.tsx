import Link from "next/link";
import React from "react";

const MarketingLayout = ({ children, auth }: { children: React.ReactNode, auth:React.ReactNode }) => {
  return (
    <div className="bg-sky-600 p-2">
      <h1 className="text-2xl font-bold">(marketing) Layout</h1>
      <nav className="bg-red-800 p-2">
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>

          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
      {children}
      {auth}
    </div>
  );
};

export default MarketingLayout;
