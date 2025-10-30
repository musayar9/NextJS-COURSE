"use client";
import React, { useActionState } from "react";
import signIn from "../../functions/auth";
import { useSearchParams } from "next/navigation";

const GithubLogin = () => {
  const [state, formAction, isPending] = useActionState<
    | {
        error: string | null;
      }
    | undefined, FormData
  >(signIn, { error: null });
console.log(state, "state")
const redirecTo = searchParams.get("redirectTo") || "/dashboard"
  const searchParams = useSearchParams();
  return (
    <form action={formAction}>
      {state?.error && (
        <p className="bg-red-500 text-white p-2 my-4 rounded-md">{state.error}</p>
      )}
<input type="hidden" value={redirecTo} name="redirectTo" />
      <button
        disabled={isPending}
        className="p-2 bg-black text-white disabled:opacity"
      >
        Sign In With Google
      </button>
    </form>
  );
};

export default GithubLogin;
