import { fetchPosts } from "@/db/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //   const response = NextResponse.redirect(new URL("/blog", request.url));
  //   response.cookies.set("test", "123");
  //   return response;

  try {
    const response = NextResponse.redirect(new URL("/blog", request.url));
    response.cookies.set("x-token", "123");
    const page = request.nextUrl.searchParams.get("page") || 2;
    // console.log("page", page)
    const posts = await fetchPosts(page);
    // console.log(posts);
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "An Unexpected Error Occurred" },
      { status: 500 }
    );
  }
}
