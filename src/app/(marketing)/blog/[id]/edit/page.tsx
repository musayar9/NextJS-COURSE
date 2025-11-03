import { editPost } from "@/app/functions/posts";
import SubmitButton from "@/components/SubmitButton";
import { getAllPostIds, getPostById } from "@/db/data";
import React from "react";
import EditPostForm from "./EditPostForm";
import { notFound } from "next/navigation";
import { requireLogin } from "../../../../../auth";

const EditBlogPost = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const user = await requireLogin();

  if (!user && !["admin", "editor"].includes(user.role)) {
    return "Unauthorized";
  }

  const { id } = await params;
  console.log("Received ID:", id);

  const post = await getPostById(id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-[800px] bg-gray-900 p-4 mt-4 rounded-md">
      <EditPostForm post={post} id={id} />
    </div>
  );
};

export default EditBlogPost;
