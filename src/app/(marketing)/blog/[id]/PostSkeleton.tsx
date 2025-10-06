import React from "react";

const PostSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-400 rounded-full w-[70%] mb-6"></div>
      <div className="h-3 bg-gray-400 rounded-full  mb-2.5"></div>
      <div className="h-3 bg-gray-400 rounded-full  mb-2.5"></div>
      <div className="h-3 bg-gray-400 rounded-full  mb-2.5"></div>
      <div className="h-3 bg-gray-400 rounded-full  mb-6"></div>
      <div className="h-3 bg-gray-400 rounded-full max-w-[200px]  mb-4"></div>
      <div className="flex mt-6">
        <div className="h-3 bg-gray-400 rounded-full max-w-[100px] flex-1 me-4"></div>
        <div className="h-3 bg-gray-400 rounded-full max-w-[100px] flex-1 "></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
