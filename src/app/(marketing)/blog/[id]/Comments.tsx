import { getCommentsByPostId } from "@/db/data";
import { connection } from "next/server";
import React from "react";

const Comments = async ({ id }: { id: string }) => {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, 3000));
  throw new Error("Simulated Error for testing");
  const comments = await getCommentsByPostId(id);
  return (
    <div className="mt-6 border-t border-gray-100 pt-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="mb-4 p-4 border border-gray-700 rounded-md bg-slate-50 text-black"
        >
          <p>{comment.content}</p>
          <p className="text-sm text-gray-400 mt-4">
            By {comment.authorName} on{" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
