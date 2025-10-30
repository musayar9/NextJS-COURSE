"use server";

import { db } from "@/db/drizzle";
import { postLikes, posts } from "@/db/schema";
import { validateHeaderName } from "http";
import z, { treeifyError } from "zod";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getPostStats } from "../../db/data";

const EditPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 3 characters").max(200),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

export type EditPostFormState = {
  payload?: FormData;
  message?: string | null;
  errors?: {
    title?: { errors: string[] };
    content?: { errors: string[] };
  };
};
export const editPost = async (
  id: string,
  prevState: EditPostFormState,
  formData: FormData
): Promise<EditPostFormState> => {
  console.log("ı Ran ", prevState);

  // return { message: "This is a test solving" };
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // extracting the data from the form
  const title = formData.get("title");
  const content = formData.get("content");

  // validating the fields

  const validatedData = EditPostSchema?.safeParse({ title, content });

  if (!validatedData.success) {
    console.log(treeifyError(validatedData.error));
    return {
      message: "Validation Errors",
      errors: treeifyError(validatedData.error).properties,
      payload: formData,
    };
  }

  // run a query to update the post
  try {
    const updatePost = await db
      .update(posts)
      .set({
        ...validatedData.data,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();

    if (!updatePost[0]) {
      return { message: "Post not found", payload: formData };
    }
  } catch (error) {
    console.log("error", error);
    return { message: "An error has occurred", payload: formData };
  }

  // Revalidate the cache
  /*
 revalidatePath("/blog")	Blog listesini güncelle
revalidatePath(/blog/${id})	Güncellenen tek yazıyı yeniden oluştur
Sonuç	Kullanıcı hemen güncel veriyi görür
 */

  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);

  // redirectn to post route
  redirect(`/blog/${id}`);

  // handle Errors
};

export const togglePostLike = async (postId: string) => {
  const userId = (await cookies()).get("user_id")?.value;

  if (!userId) {
    return { message: "Unauthorized" };
  }

  try {
    const like = await db
      .select()
      .from(postLikes)
      .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)))
      .limit(1);

    if (like[0]) {
      await db
        .delete(postLikes)
        .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)));
      // revalidatePath(`/blog/${postId}`);
      const postStats = await getPostStats(postId);
      return { isLiked: false, likesCount: postStats.likesCount };
    } else {
      await db.insert(postLikes).values({ postId, userId });
      // revalidatePath(`/blog/${postId}`);
      const postStats = await getPostStats(postId);
      return { isLiked: true, likesCount: postStats.likesCount };
    }
  } catch (error) {
    return { message: "An error has occurred" };
  }
};
