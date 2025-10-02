"use client";

import Link from "next/link";

export default function FeedPage() {
  const posts = [
    { id: "1", title: "İlk gönderi" },
    { id: "2", title: "İkinci gönderi" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Feed</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id}>
            {/* Burada link aslında /post/[id] route’una gider */}
            {/* Ama Intercept Routes bunu yakalayıp @modal altında açar */}
            <Link href={`/post/${post.id}`} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
