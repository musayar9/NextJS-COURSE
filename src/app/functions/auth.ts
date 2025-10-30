"use server";

import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { headers } from "next/headers";

const signIn = async (
  prevState: { error: string | null } | undefined,
  formData: FormData
) => {
  let redirectUrl;
  try {
    const res = await auth.api.signInSocial({
      body: {
        provider: "github",
        callbackURL: formData.get("redirectTo")?.toString() || "/dashboard",
      },
    });

    console.log(res);
    redirectUrl = res.url;
  } catch (error) {
    console.log(error);
    return { error: "An error has occured" };
  }
  if (redirectUrl) {
    redirect(redirectUrl);
  }
};

export default signIn;

export const signOut = async () => {
  await auth.api.signOut({ headers: await headers });
};
