import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <Link href={"/blog"}>Go back to blog</Link>
    </div>
  );
};

export default NotFound;
