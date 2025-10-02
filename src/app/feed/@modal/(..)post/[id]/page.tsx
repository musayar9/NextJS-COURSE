"use client";

import { useRouter } from "next/navigation";
import React, { use } from "react";

const PostModal = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h1 className="text-lg font-bold mb-4">Modal Gönderi</h1>
        <p>Gönderi ID: {id}</p>
        <p>Bu, /feed üzerindeyken modal içinde açılır.</p>

        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

export default PostModal;