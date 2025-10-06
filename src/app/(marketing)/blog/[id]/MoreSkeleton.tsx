import React from "react";

const MoreSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="p-4 border rounded-md bg-gray-900">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-400 rounded-full w-[70%] mb-4"></div>
            <div className="h-3 bg-gray-400 rounded-full  w-[50%] mb-6"></div>
            <div className="h-3 bg-gray-400 rounded-full mb-2.5"></div>
            <div className="h-3 bg-gray-400 rounded-full mb-2.5"></div>
            <div className="h-3 bg-gray-400 rounded-full mb-4"></div>
            <div className="h-3 bg-gray-400 rounded-full max-w-[200px] "></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoreSkeleton;
