import React from "react";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Gönderi Sayfası</h1>
      <p>Gönderi ID: {id}</p>
      <p>Bu, normal /post/{id} sayfası.</p>
    </div>
  );
};
export default PostPage;
