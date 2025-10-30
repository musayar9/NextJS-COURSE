import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.headers.get("x-token");
  if (token !== process.env.SECRET_TOKEN) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const data = await request.json();
  // console.log("data", data);
  if (!data.id) {
    return NextResponse.json({ message: "No ID Provided" }, { status: 400 });
  }
  revalidatePath(`/blog/${data.id}`);
  revalidatePath(`/blog`);

  return NextResponse.json({ success: true });
}
