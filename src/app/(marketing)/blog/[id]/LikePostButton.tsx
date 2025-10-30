"use client";

import { useOptimistic, useState, useTransition } from "react";
import { togglePostLike } from "../../../functions/posts";

export default function LikePostButton({
  likesCount: initialLikesCount,
  isLiked: initialIsLiked,
  postId,
}: {
  likesCount: number;
  isLiked: boolean;
  postId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [optimisticLikesInfo, setOptimisticIsLiked] = useOptimistic<
    { isLiked: boolean; likesCount: number },
    boolean
  >({ isLiked, likesCount }, (state, newIsLiked) => {
    return {
      isLiked: newIsLiked,
      likesCount: newIsLiked ? state.likesCount + 1 : state.likesCount - 1,
    };
  });
  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          setOptimisticIsLiked(!optimisticLikesInfo.isLiked);
          const result = await togglePostLike(postId);
          if (result.message) {
            alert(result.message);
          }
          if (result.isLiked !== undefined) {
            setIsLiked(result.isLiked);
            setLikesCount(result.likesCount);
          }
        });
      }}
      className={`text-white px-4 py-2 ms-4 rounded ${
        optimisticLikesInfo.isLiked ? "bg-red-600" : "bg-blue-500"
      } ${isPending ? "opacity-60" : ""}`}
    >
      {optimisticLikesInfo.isLiked ? "Unlike" : "Like"} (
      {optimisticLikesInfo.likesCount})
    </button>
  );
}
