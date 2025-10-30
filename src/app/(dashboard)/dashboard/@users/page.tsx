import React from "react";
import { requireLogin } from "../../../../auth";

const Users = async () => {
  await requireLogin();

  return <div className="bg-pink-600 p-2 m-2">Users slot</div>;
};

export default Users;
