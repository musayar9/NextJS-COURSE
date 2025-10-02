"use client";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={() => router.back()}
    >
      Go Back
    </button>
  );
};

export default BackButton;
