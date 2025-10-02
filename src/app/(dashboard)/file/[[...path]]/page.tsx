import React from "react";

const File = async ({ params }: { params: Promise<{ path?: string[] }> }) => {
  const {path} = await params
  
  console.log("path", path)
    return <div>Path { path.join("/")}</div>;
};

export default File;
