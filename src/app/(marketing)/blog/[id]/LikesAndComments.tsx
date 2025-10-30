import React from "react";
import {
  getPostCount,
  getPostStats,
  isPostLikedByUser,
} from "../../../../db/data";
import { cookies } from "next/headers";
import LikePostButton from "./LikePostButton";

const LikesAndComments = async ({ id }: { id: string }) => {
  const postStats = await getPostStats(id);
  const userId = (await cookies()).get("user_id")?.value;
  console.log("userId", userId);

  const isLiked = userId ? await isPostLikedByUser(id, userId) : false;
  return (
    <div className="mt-2 mb-4">
      {/* <span className="mr-4 text-sm font-bold">
        Likes: {postStats?.likesCount}
      </span> */}
      <span className="text-sm font-bold">
        Comments: {postStats?.commentsCount}
      </span>
      {userId && (
        <LikePostButton
          likesCount={postStats.likesCount}
          isLiked={isLiked}
          postId={id}
        />
      )}
    </div>
  );
};

export default LikesAndComments;
