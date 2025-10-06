import {
  fetchPosts,
  getAllPostIds,
  getCommentsByPostId,
  getPostById,
} from "@/db/data";
import { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";
import Comments from "./Comments";
import CommentsSkeleton from "./CommentsSkeleton";
import MoreSkeleton from "./MoreSkeleton";
import MoreOther from "./MoreOther";
import PostSkeleton from "./PostSkeleton";

const SingleBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // const post = await getPostById(id);
  //  await new Promise((resolve) => setTimeout(resolve, 5000));
  //simulate delay
  // const [post, morePosts, comments] = await Promise.all([
  //   getPostById(id),
  //   fetchPosts(2),
  //   getCommentsByPostId(id),
  // ]);
  // const comments =  getCommentsByPostId(id);
  const post = await getPostById(id);
  console.log("postt", post.authorName);
  return (
    <div className="mt-4 mb-4 text-white">
      <h1 className="text-3xl font-bold">The Blog Detail</h1>

      <ul className="space-y-4">
        <li key={post.id} className="p-4  rounded-md ">
          <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
          <p>{post.content}</p>
          <p className="text-sm text-gray-200 mt-4">
            By {post.authorName} on{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div className="mt-2">
            <span className="mr-4 text-sm font-bold">
              Likes: {post.likeCount || 0}
            </span>
            <span className="text-sm font-bold">
              Comments: {post.commentCount || 0}
            </span>
          </div>
        </li>
      </ul>
      <h1 className="text-2xl font-semibold mb-3">Comments</h1>
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments id={id} />
      </Suspense>
      <h1 className="text-3xl py-2 font-bold">More Posts</h1>
      <Suspense fallback={<MoreSkeleton />}>
        <MoreOther />
      </Suspense>
    </div>
  );
};

export default SingleBlog;
// export const dynamicParams = false;
// export const revalidate = 10; // revalidate this page every 10 seconds
// export const dynamic = "force-dynamic"
// export async function generateStaticParams() {
// const posts = await fetchPosts(2)
// return posts.map((post) => ({ id: post.id }));
// return [{ id: "9aab38cb-6df4-4a9f-2a20-beb3852ed17e" }];
// return [];
// const ids = await getAllPostIds();
// return ids;
// }

// export const metadata: Metadata = {
//   title: "Blog Detail Page",
//   description: "This is the blog detail page",
// };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);
  return {
    title: post.title,
    description: post.content.slice(0, 150) + "...",
  };
}
