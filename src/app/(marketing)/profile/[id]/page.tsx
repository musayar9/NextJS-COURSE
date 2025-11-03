import React, {
  experimental_taintObjectReference,
  experimental_taintUniqueValue,
} from "react";
import UserProfile from "./UserProfile";
import { db } from "../../../../db/drizzle";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getUserProfile } from "../../../../db/data";

const ProfilePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  // experimental_taintObjectReference("Don't pass entire user to client", user);
  // experimental_taintUniqueValue("Don't pass email to client", user, user.email)

  const user = await getUserProfile();
  if (!user) {
    notFound();
  }
  return (
    <UserProfile
      name={user.name}
      image={user.image}
      role={user.role}
      createdAt={user.createdAt}
      email={user.email}
    />
  );
};

export default ProfilePage;
