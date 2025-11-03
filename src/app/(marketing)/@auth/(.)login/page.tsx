import React from "react";
import BackButton from "./BackButton";
import GithubLogin from "../../../(auth)/login/GithubLogin";

const Login = () => {
  return (
    <div className="w-full h-full top-0 start-0 flex items-center justify-center bg-[rgba(1,1,1,0.6)] fixed">
      <BackButton />
      <h1 className="text-xl"> MOdAL Login </h1>
      <GithubLogin/>
    </div>
  );
};

export default Login;
