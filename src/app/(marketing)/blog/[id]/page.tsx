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
import LikesAndComments from "./LikesAndComments";
import { notFound } from "next/navigation";
import ErrorBoundary from "../../../../components/ErrorBoundary";

export const experimental_ppr = true;

const SingleBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // UUID format validation
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    notFound();
  }

  // let post;
  // try {
  //   post = await getPostById(id);
  // } catch (error) {
  //   console.error('Database error:', error);
  //   notFound();
  // }
  const post = await getPostById(id);
  if (!post) {
    notFound();
  }
  console.log("postt", post.authorName);
  return (
    <div className="mt-4 mb-4 text-white">
      <h1 className="text-3xl font-bold">The Blog Detail</h1>

      <ul className="space-y-4">
        <li key={post.id} className="p-4  rounded-md ">
          <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
          <p>{post.content}</p>
          <p className="text-sm text-gray-200 mt-4 mb-4">
            By {post.authorName} on{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
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
        </li>
      </ul>

      <Suspense fallback={<div>Loading...</div>}>
        <LikesAndComments id={id} />
      </Suspense>

      <h1 className="text-2xl font-semibold mb-3">Comments</h1>

      <ErrorBoundary fallback={<p>Error loading Components</p>}>
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments id={id} />
        </Suspense>
      </ErrorBoundary>
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

export async function generateStaticParams() {
  const ids = await getAllPostIds();
  return ids;
}

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

  // UUID format validation
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return {
      title: "Post Not Found",
      description: "The requested post does not exist.",
    };
  }

  let post;
  try {
    post = await getPostById(id);
  } catch (error) {
    console.error("Database error in generateMetadata:", error);
    return {
      title: "Post Not Found",
      description: "The requested post does not exist.",
    };
  }

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.content.slice(0, 150) + "...",
  };
}
