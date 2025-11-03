import React from "react";
import {
  getPostCount,
  getPostStats,
  isPostLikedByUser,
} from "../../../../db/data";
import { cookies } from "next/headers";
import LikePostButton from "./LikePostButton";
import Link from "next/link";
import { getCurrentUser } from "../../../../auth";

const LikesAndComments = async ({ id }: { id: string }) => {

const user = await getCurrentUser()
  const postStats = await getPostStats(id);
  // const userId = (await cookies()).get("user_id")?.value;
  console.log("userId", userId);

  const isLiked = user ? await isPostLikedByUser(id, user.id) : false;
  return (
    <div className="mt-2 mb-4">
      {/* <span className="mr-4 text-sm font-bold">
        Likes: {postStats?.likesCount}
      </span> */}
      <span className="text-sm font-bold">
        Comments: {postStats?.commentsCount}
      </span>
      {user && (
        <LikePostButton
          likesCount={postStats.likesCount}
          isLiked={isLiked}
          postId={id}
        />
      )}
      {user && ["admin", "editor"].includes(user.role) && (
        <Link
          href={`/blog/${id}/edit`}
          className="
        mt-4
        px-4 py-2
        bg-blue-500 text-white rounded-md
      duration-150 ease-in-out
        hover:bg-blue-600 hover:scale-150
      "
        >
          Edit Post
        </Link>
      )}
    </div>
  );
};

export default LikesAndComments;
