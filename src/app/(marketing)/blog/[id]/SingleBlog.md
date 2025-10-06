```js
import {
  fetchPosts,
  getAllPostIds,
  getCommentsByPostId,
  getPostById,
} from "@/db/data";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

const SingleBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // const post = await getPostById(id);
  const [post, morePosts, comments] = await Promise.all([
    getPostById(id),
    fetchPosts(2),
    getCommentsByPostId(id),
  ]);
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

          <div className="mt-6 border-t border-gray-100 pt-4">
            <h2 className="text-2xl font-semibold mb-3">Comments</h2>

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
        </li>
      </ul>

      <div className="mt-4 mb-4 text-white">
        <h1 className="text-3xl py-2 font-bold">More Posts</h1>

        <ul className="space-y-4">
          {morePosts.map((post) => (
            <li
              key={post.id}
              className="p-4 border border-slate-100 shadow shadow-amber-50 rounded-md bg-gray-900"
            >
              <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
              <p>{post.content}</p>
              <p className="text-sm text-gray-400 mt-4">
                By {post.authorName} on{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-2">
                <span className="mr-4 text-sm font-bold">
                  Likes: {post.likeCount || 0}
                </span>
                <span className="text-sm font-bold">
                  Comments: {post.commentsCount || 0}
                </span>
              </div>
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-300 hover:underline mt-4 block hover:text-blue-600"
              >
                Read more <span className="sr-only">on {post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleBlog;
// export const dynamicParams = false;
// export const revalidate = 10; // revalidate this page every 10 seconds
// export const dynamic = "force-dynamic"
export async function generateStaticParams() {
  // const posts = await fetchPosts(2)
  // return posts.map((post) => ({ id: post.id }));
  // return [{ id: "9aab38cb-6df4-4a9f-2a20-beb3852ed17e" }];
  // return [];
  //   const ids = await getAllPostIds();
  //   return ids;
}

// export const metadata: Metadata = {
//   title: "Blog Detail Page",
//   description: "This is the blog detail page",
// };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>,
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);
  return {
    title: post.title,
    description: post.content.slice(0, 150) + "...",
  };
}
```
