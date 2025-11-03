"use client";

import { InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import { emit } from "process";
import React from "react";

const UserProfile = ({ name,image, role, createdAt, email }: { name:string, image?:string | null, role:string, createdAt:Date, email?:string | undefined }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      {email && <p>{ email}</p>}
      {user.image && (
        <Image
          src={image}
          alt={`${name}'s avatar`}
          width={100}
          height={100}
        />
      )}

      <p>Role: {role}</p>
          <p>Joined: { new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfile;
