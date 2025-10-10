import { fetchPosts, getPostCount } from "@/db/data";
import Link from "next/link";

import Posts from "./Posts";

const BlogPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // const posts = await fetchPosts();
  // const count = await getPostCount();

  // const page = (await searchParams).page || 1;

  const [posts, count] = await Promise.all([fetchPosts(), getPostCount()]);
  console.log("posts", posts);
  return (
    <div className="mt-4 mb-4 text-white">
      <h1 className="text-3xl font-bold">The Blog</h1>
      <p className="mb-4">Total Posts: {count}</p>
      <Posts  initialPosts={posts}/>
    </div>
  );
};

export default BlogPage;
