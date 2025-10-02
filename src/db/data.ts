import "server-only";

import { db } from "./drizzle";
import { comments, postLikes, posts, users } from "./schema";

import { count, countDistinct, desc, eq } from "drizzle-orm";
import { cache } from "react";
const POSTS_PER_PAGE = 5; // POSTS PER PAGE

export const fetchPosts = async (page = 1) => {
  try {
    const likesCount = db
      .select({
        postId: postLikes.postId,
        likeCount: count(postLikes.userId).as("likeCount"),
      })
      .from(postLikes)
      .groupBy(postLikes.postId)
      .as("likesCount");

    const commentsCount = db
      .select({
        postId: comments.postId,
        commentCount: count(comments.id).as("commentCount"),
      })
      .from(comments)
      .groupBy(comments.postId)
      .as("commentsCount");

    const result = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
        authorName: users.name,
        image:users.image,
        likeCount: likesCount.likeCount,
        commentsCount: commentsCount.commentCount,
      })
      .from(posts)
      .innerJoin(users, eq(posts.author, users.id))
      .leftJoin(likesCount, eq(posts.id, likesCount.postId))
      .leftJoin(commentsCount, eq(posts.id, commentsCount.postId))
      .orderBy(desc(posts.createdAt))
      .limit(POSTS_PER_PAGE)
      .offset((page - 1) * POSTS_PER_PAGE);

    return result;
  } catch (error) {
    console.error("fetchPosts error", error);
    throw new Error("Failed to fetch posts");
  }
};

export async function getPostCount() {
  const result = await db
    .select({ count: count(posts.id).as("count") })
    .from(posts);
  return Number(result[0].count) || 0;
}

export async function getAllPostIds() {
  const result = await db.select({ id: posts.id }).from(posts);
  return result;
}

export const getPostById = cache(async (postId: string) => {
  try {
    const result = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        authorName: users.name,
        likeCount: countDistinct(postLikes.userId).as("likeCount"),
        commentCount: countDistinct(comments.id).as("commentCount"),
      })
      .from(posts)
      .innerJoin(users, eq(posts.author, users.id))
      .leftJoin(postLikes, eq(postLikes.postId, posts.id))
      .leftJoin(comments, eq(comments.postId, posts.id))
      .where(eq(posts.id, postId))
      .groupBy(posts.id, users.id);

    return result[0] ?? null;
  } catch (error) {
    console.error("getPostById Error:", error);
    throw new Error("Failed to fetch post.");
  }
});

export async function getCommentsByPostId(postId: string) {
  const result = await db
    .select({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      authorName: users.name,
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.postId, postId))
    .orderBy(comments.createdAt);

  return result;
}



