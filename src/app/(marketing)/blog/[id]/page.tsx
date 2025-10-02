import React from "react";

const SingleBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div className="p-2">Post: {id}</div>;
};

export default SingleBlog;
