"use client";

import { editPost, EditPostFormState } from "@/app/functions/posts";
import { getPostById } from "@/db/data";
import React, { useActionState } from "react";

const EditPostForm = ({
  post,
}: {
  post: Exclude<Awaited<ReturnType<typeof getPostById>>, null>;
}) => {
  const editPostWithId = editPost.bind(null, post.id);

  const initialState: EditPostFormState = { message: null, error: undefined };
  const [state, formAction, pending] = useActionState(
    editPostWithId,
    initialState
  );

  console.log("state", state.errors?.title?.errors[0]);
  console.log("state", state.errors?.content?.errors[0]);
  return (
    <form action={formAction}>
      <div aria-live="polite" aria-atomic="true">
        {state.message && (
          <div className="bg-red-500 p-2 mb-4 text-white rounded shadow animate-pulse shadow-amber-50">
            {state.message}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-white">
          Post Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={(state.payload?.get("title") as string) || post.title}
          required
          placeholder="Post Title"
          className="block w-full text-white rounded-md border border-white p-2 placeholder:text-slate-400"
          aria-describedby="title-error"
        />
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        id="title-error"
        className="mb-4"
      >
        {state.errors?.title?.errors[0] && (
          <div className="text-red-500">{state.errors?.title?.errors[0]}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="mb-2 block text-white">
          Post Content
        </label>
        <textarea
          style={{ minHeight: 200 }}
          id="content"
          name="content"
          defaultValue={
            (state.payload?.get("content") as string) || post.content
          }
          required
          placeholder="Post Content"
          className="block w-full rounded-md border text-white border-white p-2 placeholder:text-slate-400"
          aria-describedby="content-error"
        />
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="mb-4"
        id="content-error"
      >
        {state.errors?.content?.errors[0] && (
          <div className="text-red-500">{state.errors?.content?.errors[0]}</div>
        )}
      </div>

      {/* <SubmitButton /> */}

      <button
        disabled={pending}
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Updating" : "Submit"}
      </button>
    </form>
  );
};

export default EditPostForm;
