"use client";
import { fetchPosts } from "@/db/data";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const Posts = ({
  initialPosts,
  totalPosts,
}: {
  initialPosts: Awaited<ReturnType<typeof fetchPosts>>;
  totalPosts: number;
}) => {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(totalPosts / 5);

  // useEffect(() => {
  //   // Example: Set likeCount to 2 if it's less than 2
  //   const result = posts.map((item) =>
  //     item.likeCount <= 1 ? { ...item, likeCount: item.likeCount + 2 } : item
  //   );
  //   // If you want to update the posts state, uncomment the next line:
  //   // setPosts(result);
  //   setPosts(result);
  // }, []);

  const loadMorePosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const newPosts = await fetch(`/api/posts?page=${currentPage + 1}`);
      // console.log(newPosts)
      const data = await newPosts.json();
      // // setPosts(newPosts);
      console.log("data", data);
      // console.log("data", data);

      setCurrentPage((prev) => prev + 1);

      // setPosts([...posts, ...data]);
      setPosts((prev) =>[...prev, ...data])
    } catch (error) {
      console.log("err", error);
    }
    setIsLoading(false);
  }, [currentPage, posts]);
  return (
    <div>
      <ul className="space-y-4">
        {posts.map((post) => (
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
      {currentPage < totalPages && (
        <div className="mt-4 text-center">
          <button disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={loadMorePosts}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
