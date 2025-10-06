import React from "react";

const CommentsSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="p-4 border rounded-md bg-gray-200">
          <div className="animate-pulse">
            <div className="h-3 bg-gray-400 rounded-full mb-2 5"></div>
            <div className="h-3 bg-gray-400 rounded-full mb-2 5"></div>
            <div className="h-3 bg-gray-400 rounded-full mb-2 5"></div>
            <div className="h-3 bg-gray-400 rounded-full mb-2 5 max-w-[200px]"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSkeleton;
