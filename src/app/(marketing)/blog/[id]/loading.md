```js
import React from "react";
import PostSkeleton from "./PostSkeleton";
import CommentsSkeleton from "./CommentsSkeleton";
import MoreSkeleton from "./MoreSkeleton";

const Loading = () => {
  return (
    <div className="p-2">
      <PostSkeleton />
      <div className="mb-4"></div>
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <CommentsSkeleton />
      <div className="mb-4"></div>
      <h2 className="text-2xl font-semibold mt-8 mb-4">More Posts</h2>
      <MoreSkeleton />
    </div>
  );
};

export default Loading;
```
