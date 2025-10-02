import { fetchPosts, getPostCount } from "@/db/data";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
  const posts = await fetchPosts();
  const count = await getPostCount();

  console.log("posts", posts);
  return (
    <div className="mt-4 mb-4">
      <h1 className="text-3xl font-bold">The Blog</h1>
      <p className="mb-4">Total Posts: {count}</p>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border border-slate-100 shadow shadow-amber-50 rounded-md bg-gray-200">
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
                Comments: {post.commentCount || 0}
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
  );
};

export default BlogPage;
