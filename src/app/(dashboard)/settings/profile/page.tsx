import React from "react";
import { requireLogin } from "../../../../auth";

const Profile = async () => {
  const user = await requireLogin("/settings/profile");
  return (
    <div className="bg-pink-700 p-2">
      <h1 className="text-2xl font-bold">Profile Settings Page</h1>
      <p>{user.name}</p>
      <img
        src={user.image}
        alt={user.name}
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
        }}
      />
    </div>
  );
};

export default Profile;
