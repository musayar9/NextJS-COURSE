import React from "react";
import GithubLogin from "./GithubLogin";
import { getCurrentUser } from "../../../auth";
import { redirect } from "next/navigation";

const Login = () => {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Login Page</h1>
      <GithubLogin />
    </div>
  );
};

export default Login;
